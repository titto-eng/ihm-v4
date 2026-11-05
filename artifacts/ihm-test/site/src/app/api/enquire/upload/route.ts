import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { APPLICATION_FILE_MAX_BYTES } from '@/collections/ApplicationFiles'
import { handleUpload } from '@/lib/enquiries/upload'

// POST /api/enquire/upload/ — multipart: formKey, field, file. 40-enquiries §4a. The pipeline is in src/lib/enquiries/upload.ts.
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const length = Number(req.headers.get('content-length') ?? 0)
  if (length > APPLICATION_FILE_MAX_BYTES + 64 * 1024) return NextResponse.json({ ok: false, error: 'too_large', message: 'The file must be 10MB or smaller.' }, { status: 413 })
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ ok: false, error: 'validation', message: 'Choose a file to upload.' }, { status: 400 })
  }
  const payload = await getPayload({ config })
  const out = await handleUpload({ payload, form, headers: req.headers })
  return NextResponse.json(out.body, { status: out.status, headers: { 'Cache-Control': 'no-store', ...out.headers } })
}
