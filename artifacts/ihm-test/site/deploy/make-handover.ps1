<#
  Builds the deployment handover for the hosting team (docs/DEPLOYMENT.md).

  Run in PowerShell from the project folder, with Docker Desktop running and the local database up (`docker compose up -d`):

      powershell -ExecutionPolicy Bypass -File deploy\make-handover.ps1

  Creates handover\<yyyyMMdd-HHmm>\ with:
    ihm-db-<stamp>.dump      PostgreSQL custom-format dump (content only: no users, enquiries, payments, CVs, jobs or sessions)
    media-<stamp>.zip        CMS uploads (media\), without media\application-files (CVs are personal data)
    public-static-<stamp>.zip  git-ignored static PDF stores under public\ (pdf, brochures, IHM_Domestic_SHB, International-SHB)
    source-<stamp>.zip       the source code as git sees it (tracked + new files, .gitignore respected; no .env, node_modules)
    SHA256SUMS.txt           checksums of the four files
  Nothing secret goes into these files. Send the .env values separately (see DEPLOYMENT.md §3).
#>
param(
  [string]$OutRoot = (Join-Path (Get-Location) 'handover'),
  [switch]$AllowMissingDocuments  # build the handover even if the policy PDFs have not been imported yet
)

$ErrorActionPreference = 'Stop'

# Zips are written with .NET (System.IO.Compression), so the script needs no tar.exe or other tool on the PATH.
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem
function Get-RelativeFiles([string]$dir, [string[]]$skipTop = @()) {
  $base = (Resolve-Path $dir).Path.TrimEnd('\')
  Get-ChildItem -LiteralPath $base -File -Recurse -Force | ForEach-Object { $_.FullName.Substring($base.Length + 1) } |
    Where-Object { $skipTop -notcontains ($_ -split '\\')[0] }
}
function New-Zip([string]$zipPath, [string]$baseDir, [string[]]$relFiles, [string]$level = 'Fastest') {
  $base = (Resolve-Path $baseDir).Path
  if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath }
  $zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    foreach ($rel in $relFiles) {
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, (Join-Path $base $rel), ($rel -replace '\\', '/'), [System.IO.Compression.CompressionLevel]::$level) | Out-Null
    }
  } finally { $zip.Dispose() }
  Write-Host ("    {0} files" -f $relFiles.Count)
}
$root = Get-Location
if (-not (Test-Path (Join-Path $root 'package.json')) -or -not (Test-Path (Join-Path $root 'src\payload.config.ts'))) {
  throw 'Run this from the project folder (Documents\ihm-website-v4).'
}
$stamp = Get-Date -Format 'yyyyMMdd-HHmm'
$out = Join-Path $OutRoot $stamp
New-Item -ItemType Directory -Force -Path $out | Out-Null
Write-Host "Handover folder: $out" -ForegroundColor Cyan

# ---- 0. Pre-flight -------------------------------------------------------------------------------------------------
$warnings = @()
if (-not (Test-Path 'public\pdf')) {
  $msg = 'public\pdf is missing: the policy/procedure PDFs have not been imported (npm run import -- static, then npm run import -- documents). See DEPLOYMENT.md §1.'
  if ($AllowMissingDocuments) { $warnings += $msg } else { throw $msg + ' Re-run with -AllowMissingDocuments to continue anyway.' }
}
if (-not (Test-Path 'public\images\home\hero\social-work-community.webp')) {
  $warnings += 'Live-site images not downloaded yet (npm run assets:legacy). Pages will use stand-in photos.'
}
$running = docker compose ps --status running --services
if ($running -notcontains 'postgres') { throw 'The postgres container is not running: start Docker Desktop, then docker compose up -d' }

# ---- 1. Database -----------------------------------------------------------------------------------------------------
Write-Host '1/4 Dumping the database...' -ForegroundColor Cyan
$dump = "ihm-db-$stamp.dump"
# Rows that are personal, transactional or local only are left out (the tables themselves are kept).
$noData = @(
  'users', 'users_*', 'alumni', 'alumni_*',
  'enquiries', 'enquiries_*', 'payments', 'payments_*', 'application_files',
  'payload_jobs', 'payload_jobs_*', 'payload_kv', 'payload_locked_documents', 'payload_locked_documents_rels',
  'payload_preferences', 'payload_preferences_rels'
) | ForEach-Object { "--exclude-table-data=$_" }
docker compose exec -T postgres pg_dump -U postgres -d ihm -Fc --no-owner --no-privileges @noData -f /tmp/handover.dump
if ($LASTEXITCODE -ne 0) { throw 'pg_dump failed' }
docker compose cp postgres:/tmp/handover.dump (Join-Path $out $dump) | Out-Null
docker compose exec -T postgres rm -f /tmp/handover.dump | Out-Null

# ---- 2. Media (CMS uploads) ------------------------------------------------------------------------------------------
Write-Host '2/4 Packing media\ (without application-files)...' -ForegroundColor Cyan
$media = "media-$stamp.zip"
New-Zip (Join-Path $out $media) 'media' @(Get-RelativeFiles 'media' @('application-files'))

# ---- 3. Static PDF stores in public\ (git-ignored) -------------------------------------------------------------------
Write-Host '3/4 Packing static PDF stores...' -ForegroundColor Cyan
$static = "public-static-$stamp.zip"
$stores = @('pdf', 'brochures', 'IHM_Domestic_SHB', 'International-SHB') | Where-Object { Test-Path (Join-Path 'public' $_) }
if ($stores.Count -gt 0) {
  $files = foreach ($st in $stores) { Get-RelativeFiles (Join-Path 'public' $st) | ForEach-Object { Join-Path $st $_ } }
  New-Zip (Join-Path $out $static) 'public' @($files)
} else { $warnings += 'No static PDF stores found under public\.'; $static = $null }

# ---- 4. Source code --------------------------------------------------------------------------------------------------
Write-Host '4/4 Packing the source code...' -ForegroundColor Cyan
$source = "source-$stamp.zip"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'git is not on the PATH: open a new PowerShell window, or install Git for Windows.' }
$files = git -c core.quotepath=off ls-files --cached --others --exclude-standard |
  Where-Object { $_ -notmatch '^(\.env($|\.)(?!example)|handover/|media/|node_modules/|\.next/)' -and (Test-Path -LiteralPath $_) } |
  ForEach-Object { $_ -replace '/', '\' }
New-Zip (Join-Path $out $source) '.' @($files) 'Optimal'

# ---- Checksums and summary -------------------------------------------------------------------------------------------
Get-ChildItem $out -File | Where-Object Name -ne 'SHA256SUMS.txt' | ForEach-Object {
  "{0}  {1}" -f (Get-FileHash $_.FullName -Algorithm SHA256).Hash.ToLower(), $_.Name
} | Set-Content -Encoding ascii (Join-Path $out 'SHA256SUMS.txt')

Write-Host ''
Get-ChildItem $out -File | Format-Table Name, @{ n = 'Size (MB)'; e = { [math]::Round($_.Length / 1MB, 1) } } -AutoSize
foreach ($w in $warnings) { Write-Warning $w }
Write-Host "Done. Share the folder above with the hosting team (S3 pre-signed link or similar), plus docs\DEPLOYMENT.md." -ForegroundColor Green
Write-Host 'Send the production .env values separately (password manager / AWS Secrets Manager), never in these files.' -ForegroundColor Yellow
