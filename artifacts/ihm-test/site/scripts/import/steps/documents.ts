/**
 * Step `documents`: turns the static PDF stores in public/ (`pdf/**`, `brochures/**`, `IHM_Domestic_SHB/`, `International-SHB/`, copied
 * by the `static` step) into `documents` rows, one per file, with `publicPath` = its public URL, so marketing can replace a file in
 * the admin and the URL keeps serving (src/app/(site)/pdf/serve.ts).
 *
 * - Skips paths in seeds/static-held.json (DEC-32: gone stays gone) and the old names in DOCUMENT_ALIASES (they serve the aliased
 *   document). An alias whose target has no file of its own is imported FROM the old name (the Fraud and Corruption policy).
 * - category/audience from the folder (policies → policy/students, procedures → procedure/students, IHM_Policies_and_Procedures_for_Staff
 *   → staff-policy/staff, handbooks → handbook/students, brochures → brochure) and a small name heuristic for the rest.
 * - title = the link text on /policies-procedures/ (PAGE_LINKS, captured from the page before it moved to the collection), else the
 *   cleaned file name. `listings` (tab + order) come from PAGE_LINKS, keeping the page's order.
 * - Idempotent on publicPath: a missing row is created with its file; an existing row gets its title/category/audience/listings
 *   refreshed when they differ, and its FILE IS NEVER REPLACED unless `--force` (a file marketing replaced stays replaced).
 * Run: `npm run import -- documents [--dry] [--force] [--only=/pdf/policies/X.pdf,...]`
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, posix, relative, resolve } from 'node:path'
import { DOCUMENT_ALIASES, type DocumentSection } from '../../../src/collections/Documents'
import { ROOT } from '../lib/config'
import type { ImportContext } from '../lib/context'

export const name = 'documents'
export const order = 110 // after `static` (100): the files it imports are the ones static copies into public/

const PUBLIC = resolve(ROOT, 'public')
const STORES = ['pdf', 'brochures', 'IHM_Domestic_SHB', 'International-SHB']

type PageLink = [DocumentSection, string, string]

/** Every PDF link on /policies-procedures/ as of 2026-10-20, in page order: [tab, href (decoded), link text]. */
export const PAGE_LINKS: PageLink[] = [
  ['student-policies', '/pdf/policies/Academic_Honesty_and_Integrity_Policy.pdf', 'Academic Honesty and Integrity Policy'],
  ['student-policies', '/pdf/policies/Access_and_Equity_Policy.pdf', 'Access and Equity Policy'],
  ['student-policies', '/pdf/policies/Accessibility_Policy.pdf', 'Accessibility Policy'],
  ['student-policies', '/pdf/policies/Admission_Enrolment_Policy.pdf', 'Admission and Enrolment Policy'],
  ['student-policies', '/pdf/policies/IHM_Agent_Appointment_Monitoring_and_Management_Policy.pdf', 'Agents Appointment, Monitoring and Management Policy'],
  ['student-policies', '/pdf/policies/Aboriginal_and_Torres_Strait_Islander_Education_and_Support_Policy.pdf', 'Aboriginal and Torres Strait Islander Education and Support Policy'],
  ['student-policies', '/pdf/policies/Aboriginal_and_Torres_Strait_Islander_Education_and_Support_Guidelines.pdf', 'Aboriginal and Torres Strait Islander Education and Support Guidelines'],
  ['student-policies', '/pdf/policies/Assessment_Design_Moderation_and_Validation_Policy.pdf', 'Assessment Design Moderation and Validation Policy'],
  ['student-policies', '/pdf/policies/Use_of_Artificial_Intelligence_for_Academic_Purposes_Policy.pdf', 'Use of Artificial Intelligence for Academic Purposes Policy'],
  ['student-policies', '/pdf/policies/Referencing_and_Style_Guide.pdf', 'Referencing and Style Guide'],
  ['student-policies', '/pdf/policies/Student_Assessment_Guide.pdf', 'Student Assessment Guide'],
  ['student-policies', '/pdf/policies/Attendance_Policy.pdf', 'Attendance policy'],
  ['student-policies', '/pdf/policies/Bachelor_of_Nursing_Admission_and_Enrolment_Policy.pdf', 'Bachelor of Nursing Admission and Enrolment Policy'],
  ['student-policies', '/pdf/policies/Bullying_and_Harassment_Prevention_Policy.pdf', 'Bullying and Harassment Prevention Policy'],
  ['student-policies', '/pdf/policies/Changes_to_Enrolment_Policy.pdf', 'Changes to Enrolment Policy'],
  ['student-policies', '/pdf/policies/Copyright_Policy_for_Students.pdf', 'Copyright Policy'],
  ['student-policies', '/pdf/policies/Credit_and_Prior_Learning_Policy.pdf', 'Credit and Prior Learning Policy'],
  ['student-policies', '/pdf/policies/Critical_Incident_Response_Policy.pdf', 'Critical Incident Response Policy'],
  ['student-policies', '/pdf/policies/Cyber_Safety_and_Security_Policy.pdf', 'Cyber Safety and Security Policy'],
  ['student-policies', '/pdf/policies/Fees_Charges_and_Refunds_for_International_Students_Policy.pdf', 'Fees, Charges and Refunds for International Students Policy'],
  ['student-policies', '/pdf/policies/IHM_Fees_Charges_and_Refunds_for_Domestic_Students_Policy.pdf', 'Fees, Charges and Refunds for Domestic Students Policy'],
  ['student-policies', '/pdf/policies/Fraud_and_Corruption_Prevention_and_Control_Policy.pdf', 'Fraud and Corruption Prevention and Control Policy'],
  ['student-policies', '/pdf/policies/IHM_Inherent_Requirements_bon.pdf', 'Inherent Requirement for Bachelor of Nursing'],
  ['student-policies', '/pdf/policies/International_Student_Transfer_Request_Assessment_Policy.pdf', 'International Student Transfer Request Assessment Policy'],
  ['student-policies', '/pdf/policies/Issue_of_Testamur_Policy.pdf', 'Issue of Testamur Policy'],
  ['student-policies', '/pdf/policies/Learning_and_Teaching_Policy.pdf', 'Learning and Teaching Policy'],
  ['student-policies', '/pdf/policies/Library_Policy.pdf', 'Library Policy'],
  ['student-policies', '/pdf/policies/Marking_Guidelines.pdf', 'Marking Guidelines'],
  ['student-policies', '/pdf/policies/Marketing_of_Courses_to_Offshore_and_Overseas_Students_Policy.pdf', 'Marketing of Courses to Offshore and Overseas Students Policy'],
  ['student-policies', '/pdf/policies/Professional_Experience_Policy.pdf', 'Professional Experience Placement Policy'],
  ['student-policies', '/pdf/policies/IHM_Privacy_Policy.pdf', 'Privacy Policy'],
  ['student-policies', '/pdf/policies/IHM_Records_Management_Policy.pdf', 'Records Management Policy'],
  ['student-policies', '/pdf/policies/Sexual_Assault_and_Harassment_Prevention_and_Response_Policy.pdf', 'Sexual Assault and Harassment Prevention and Response Policy'],
  ['student-policies', '/pdf/policies/Social_Media_Policy.pdf', 'Social Media Policy'],
  ['student-policies', '/pdf/policies/Student_Academic_Progression_Policy.pdf', 'Student Academic Progression Policy'],
  ['student-policies', '/pdf/policies/Student_Assessment_and_Examination_Policy.pdf', 'Student Assessment and Examination Policy'],
  ['student-policies', '/pdf/policies/Student_Code_of_Conduct.pdf', 'Student Code of Conduct'],
  ['student-policies', '/pdf/policies/Student_Complaints_and_Appeals_Policy.pdf', 'Student Complaints and Appeals Policy'],
  ['student-policies', '/pdf/policies/Health_and_Safety_Policy.pdf', 'Health and Safety Policy'],
  ['student-policies', '/pdf/policies/Student_Non_Academic_Misconduct_Policy.pdf', 'Student Non-Academic Misconduct Policy'],
  ['student-policies', '/pdf/policies/Student_Orientation_Policy.pdf', 'Student Orientation Policy'],
  ['student-policies', '/pdf/policies/Student_Representative_Council_ToR.pdf', 'Student Representative Council ToR'],
  ['student-policies', '/pdf/policies/Student_Support_Framework.pdf', 'Student Support Framework'],
  ['student-policies', '/pdf/policies/Support_for_Student_Policy.pdf', 'Support for Student Policy'],
  ['student-policies', '/pdf/policies/Survey_Management_Policy.pdf', 'Student Survey Management Policy'],
  ['student-procedures', '/pdf/procedures/Academic_Honesty_and_Integrity_Procedure.pdf', 'Academic Honesty and Integrity Procedure'],
  ['student-procedures', '/pdf/procedures/Admission_Enrolment_Procedure.pdf', 'Admission and Enrolment Procedure'],
  ['student-procedures', '/pdf/procedures/Access_and_Equity_Procedure.pdf', 'Access and Equity Procedure'],
  ['student-procedures', '/pdf/procedures/Accessibility_Procedure.pdf', 'Accessibility Procedure'],
  ['student-procedures', '/pdf/procedures/IHM_Agent_Appointment_Monitoring_and_Management_Procedure.pdf', 'Agents Appointment, Monitoring and Management Procedure'],
  ['student-procedures', '/pdf/procedures/Assessment_Design_Moderation_and_Validation_Procedure.pdf', 'Assessment Design Moderation and Validation Procedure'],
  ['student-procedures', '/pdf/procedures/Attendance_Procedure.pdf', 'Attendance procedures'],
  ['student-procedures', '/pdf/procedures/Bachelor_of_Nursing_Admission_and_Enrolment_Procedure.pdf', 'Bachelor of Nursing Admission and Enrolment Procedure'],
  ['student-procedures', '/pdf/procedures/Bullying_and_Harassment_Prevention_Procedure.pdf', 'Bullying and Harassment Prevention Procedure'],
  ['student-procedures', '/pdf/procedures/Changes_to_Enrolment_Procedure.pdf', 'Changes to Enrolment Procedure'],
  ['student-procedures', '/pdf/procedures/Copyright_Procedure.pdf', 'Copyright Procedure'],
  ['student-procedures', '/pdf/procedures/Critical_Incident_Response_Procedure.pdf', 'Critical Incident Response Procedure'],
  ['student-procedures', '/pdf/procedures/Credit_and_Prior_Learning_Procedure.pdf', 'Credit and Prior Learning Procedure'],
  ['student-procedures', '/pdf/procedures/Cyber_Safety_and_Security_Procedure.pdf', 'Cyber Safety and Security Procedure'],
  ['student-procedures', '/pdf/procedures/Fees_Charges_and_Refunds_for_International_Students_Procedure.pdf', 'Fees, Charges and Refunds for International Students Procedures'],
  ['student-procedures', '/pdf/procedures/IHM_Fees_Charges_and_Refunds_for_Domestic_Students_Procedure.pdf', 'Fees, Charges and Refunds for Domestic Students Procedures'],
  ['student-procedures', '/pdf/procedures/Health_and_Safety_Procedure.pdf', 'Health and Safety Procedure'],
  ['student-procedures', '/pdf/procedures/International_Student_Transfer_Request_Assessment_Procedure.pdf', 'International Student Transfer Request Assessment Procedure'],
  ['student-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/IHM_Alumni_Framework.pdf', 'IHM Alumni Framework'],
  ['student-procedures', '/pdf/procedures/Issue_of_Testamur_Procedure.pdf', 'Issue of Testamur Procedure'],
  ['student-procedures', '/pdf/procedures/Learning_and_Teaching_Procedure.pdf', 'Learning and Teaching Procedure'],
  ['student-procedures', '/pdf/procedures/Library_Procedure.pdf', 'Library Procedure'],
  ['student-procedures', '/pdf/procedures/Marketing_of_Courses_to_Offshore_and_Overseas_Students_Procedure.pdf', 'Marketing of Courses to Offshore and Overseas Students Procedure'],
  ['student-procedures', '/pdf/procedures/Professional_Experience_Procedure.pdf', 'Professional Experience Placement Procedure'],
  ['student-procedures', '/pdf/procedures/IHM_Privacy_Procedure.pdf', 'Privacy Procedure'],
  ['student-procedures', '/pdf/procedures/IHM_Records_Management_Procedure.pdf', 'Records Management Procedure'],
  ['student-procedures', '/pdf/procedures/Sexual_Assault_and_Harassment_Prevention_and_Response_Procedure.pdf', 'Sexual Assault and Harassment Prevention and Response Procedure'],
  ['student-procedures', '/pdf/procedures/Social_Media_Procedure.pdf', 'Social Media Procedure'],
  ['student-procedures', '/pdf/procedures/Student_Academic_Progression_Procedure.pdf', 'Student Academic Progression Procedure'],
  ['student-procedures', '/pdf/procedures/Student_Assessment_and_Examination_Procedure.pdf', 'Student Assessment and Examination Procedure'],
  ['student-procedures', '/pdf/procedures/Student_Code_of_Conduct_Implementation_Guidelines.pdf', 'Student Code of Conduct Implementation Guidelines'],
  ['student-procedures', '/pdf/procedures/Student_Complaints_and_Appeals_Procedure.pdf', 'Student Complaints and Appeals Procedure'],
  ['student-procedures', '/pdf/procedures/Student_Non_Academic_Misconduct_Procedure.pdf', 'Student Non-Academic Misconduct Procedure'],
  ['student-procedures', '/pdf/procedures/Student_Orientation_Procedure.pdf', 'Student Orientation Procedure'],
  ['student-procedures', '/pdf/procedures/Support_for_Student_Procedure.pdf', 'Support for Student Procedure'],
  ['student-procedures', '/pdf/procedures/Survey_Management_Procedure.pdf', 'Student Survey Management Procedure'],
  ['student-procedures', '/pdf/procedures/Whistleblower_Fraud_and_Corruption_Control_Procedure.pdf', 'Whistleblower (Fraud and Corruption Control) Procedure'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Fraud_and_Corruption_Prevention_and_Control_Policy.pdf', 'Fraud and Corruption Prevention and Control Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Academic_Staff_Teaching_Qualification_Policy.pdf', 'Academic Staff Teaching Qualifications and Equivalent Professional Experience Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Access_and_Equity_Policy.pdf', 'Access and Equity Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Accessing_Staff_Personal_File_Policy.pdf', 'Accessing Staff Personal File Policy'],
  ['staff-policies', '/pdf/policies/Academic_Honesty_and_Integrity_Policy.pdf', 'Academic Honesty and Integrity Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Accessibility_Policy.pdf', 'Accessibility Policy'],
  ['staff-policies', '/pdf/policies/IHM_Agent_Appointment_Monitoring_and_Management_Policy.pdf', 'Agents Appointment, Monitoring and Management Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Artificial_Intelligence_in_Operational_Uses_Framework.pdf', 'Artificial Intelligence in Operational Uses Framework'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Articulation_Policy.pdf', 'Articulation Policy'],
  ['staff-policies', '/pdf/policies/Assessment_Design_Moderation_and_Validation_Policy.pdf', 'Assessment Design Moderation and Validation Policy'],
  ['staff-policies', '/pdf/policies/Use_of_Artificial_Intelligence_for_Academic_Purposes_Policy.pdf', 'Use of Artificial Intelligence for Academic Purposes Policy'],
  ['staff-policies', '/pdf/policies/Referencing_and_Style_Guide.pdf', 'Referencing and Style Guide'],
  ['staff-policies', '/pdf/policies/Student_Assessment_Guide.pdf', 'Student Assessment Guide'],
  ['staff-policies', '/pdf/policies/Attendance_Policy.pdf', 'Attendance policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Children_on_Campus_Policy.pdf', 'Children on Campus Policy'],
  ['staff-policies', '/pdf/policies/Course_Evaluation_and_Review_Policy.pdf', 'Course Evaluation and Review Policy'],
  ['staff-policies', '/pdf/policies/Course_Design_and_Development_Policy.pdf', 'Course Design and Development Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Critical_Incident_Response_Policy.pdf', 'Critical Incident Response Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Document_Preparation_and_Review_Guidelines.pdf', 'Document Preparation and Review Guidelines'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Health_and_Safety_Policy.pdf', 'Health and Safety Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Immunisation_Policy.pdf', 'Immunisation Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Internal_Audit_Policy.pdf', 'Internal Audit Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/LMS_Management_Policy.pdf', 'LMS Management Policy'],
  ['staff-policies', '/pdf/policies/Marketing_of_Courses_to_Offshore_and_Overseas_Students_Policy.pdf', 'Marketing of Courses to Offshore and Overseas Students Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Performance_Management_Policy.pdf', 'Performance Management Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Privacy_Policy.pdf', 'Privacy Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Records_Management_Policy.pdf', 'Records Management Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/Staff_Professional_Development_Policy.pdf', 'Staff Professional Development Policy'],
  ['staff-policies', '/pdf/policies/Student_Assessment_and_Examination_Policy.pdf', 'Student Assessment and Examination Policy'],
  ['staff-policies', '/pdf/IHM_Policies_and_Procedures_for_Staff/IHM_Conflict_of_Interest_Disclosure_Framework.pdf', 'IHM Conflict of Interest Disclosure Framework'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Whistleblower_Fraud_and_Corruption_Control_Procedure.pdf', 'Whistleblower Fraud and Corruption Control Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Academic_Staff_Teaching_Qualification_Procedure.pdf', 'Academic Staff Teaching Qualifications and Equivalent Professional Experience Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Access_and_Equity_Procedure.pdf', 'Access and Equity Procedure'],
  ['staff-procedures', '/pdf/procedures/Academic_Honesty_and_Integrity_Procedure.pdf', 'Academic Honesty and Integrity Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Accessibility_Procedure.pdf', 'Accessibility Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/IHM_Alumni_Framework.pdf', 'IHM Alumni Framework'],
  ['staff-procedures', '/pdf/procedures/IHM_Agent_Appointment_Monitoring_and_Management_Procedure.pdf', 'Agents Appointment, Monitoring and Management Procedure'],
  ['staff-procedures', '/pdf/procedures/Assessment_Design_Moderation_and_Validation_Procedure.pdf', 'Assessment Design Moderation and Validation Procedure'],
  ['staff-procedures', '/pdf/procedures/Attendance_Procedure.pdf', 'Attendance procedures'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Critical_Incident_Response_Procedure.pdf', 'Critical Incident Response Procedure'],
  ['staff-procedures', '/pdf/procedures/Course_Evaluation_and_Review_Procedure.pdf', 'Course Evaluation and Review Procedure'],
  ['staff-procedures', '/pdf/procedures/Course_Design_and_Development_Procedure.pdf', 'Course Design and Development Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Health_and_Safety_Procedure.pdf', 'Health and Safety Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Internal_Audit_Procedure.pdf', 'Internal Audit Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/LMS_Management_Procedure.pdf', 'LMS Management Procedure'],
  ['staff-procedures', '/pdf/procedures/Marketing_of_Courses_to_Offshore_and_Overseas_Students_Procedure.pdf', 'Marketing of Courses to Offshore and Overseas Students Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Performance_Management_Procedure.pdf', 'Performance Management Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Privacy_Procedure.pdf', 'Privacy Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Records_Management_Procedure.pdf', 'Records Management Procedure'],
  ['staff-procedures', '/pdf/procedures/Research_Scholarship_and_Publication_Framework.pdf', 'Research Scholarship and Publication Framework'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Staff_Professional_Development_Procedure.pdf', 'Staff Professional Development Procedure'],
  ['staff-procedures', '/pdf/IHM_Policies_and_Procedures_for_Staff/Staff_Qualifications_and_Professional_Eligibility_Verification_Procedure.pdf', 'Staff Qualifications and Professional Eligibility Verification Procedure'],
  ['staff-procedures', '/pdf/procedures/Student_Assessment_and_Examination_Procedure.pdf', 'Student Assessment and Examination Procedure'],
  ['glossary', '/pdf/Glossary_of_Terms_Feb_2026.pdf', 'IHM Glossary of Terms'],
]

/** Links in the page's "IHM Forms" tab (prose stays in the page; these give the documents their titles). */
const FORM_TITLES: Record<string, string> = {
  '/pdf/IHM_Conflict_of_Interest_Declaration_Form.pdf': 'IHM Conflict of Interest Declaration Form',
  '/pdf/Learning_Access_Plan.pdf': 'Learning Access Plan',
}

type Category = 'policy' | 'procedure' | 'staff-policy' | 'form' | 'guide' | 'handbook' | 'brochure' | 'other'
type Audience = 'students' | 'staff' | 'public'

/** Category from the name alone (loose files and the smaller folders). */
export function categoryFromName(file: string): Category {
  const n = file.toLowerCase()
  if (/handbook|(^|[^a-z])shb([^a-z]|$)/.test(n)) return 'handbook'
  if (/how-do-i|what-documents/.test(n)) return 'guide'
  if (/(^|[^a-z])form([^a-z]|$)|application|checklist|declaration|access_plan/.test(n)) return 'form'
  if (/procedure/.test(n)) return 'procedure'
  if (/polic(y|ies)|framework|terms_of_reference|_tor\b|constitution/.test(n)) return 'policy'
  if (/guide|guideline|referenc|glossary|faq|_qa\b|how-do-i|what-documents|process|requirement|competency|fee_help|prospectus|profile|information/.test(n)) return 'guide'
  return 'other'
}

/** category + audience for a public path (decoded, leading slash). */
export function classify(publicPath: string): { category: Category; audience: Audience } {
  const file = posix.basename(publicPath)
  if (publicPath.startsWith('/pdf/policies/')) return { category: 'policy', audience: 'students' }
  if (publicPath.startsWith('/pdf/procedures/')) return { category: 'procedure', audience: 'students' }
  if (publicPath.startsWith('/pdf/IHM_Policies_and_Procedures_for_Staff/')) return { category: 'staff-policy', audience: 'staff' }
  if (publicPath.startsWith('/pdf/policies_procedures/')) return { category: /procedure/i.test(file) ? 'procedure' : 'policy', audience: 'students' }
  if (publicPath.startsWith('/IHM_Domestic_SHB/') || publicPath.startsWith('/International-SHB/')) return { category: 'handbook', audience: 'students' }
  if (publicPath.startsWith('/brochures/')) return { category: 'brochure', audience: 'public' }
  if (publicPath.startsWith('/pdf/ToR/') || publicPath.startsWith('/pdf/financial-standing/')) return { category: 'other', audience: 'public' }
  return { category: categoryFromName(file), audience: 'public' }
}

/** `Student_Code-of Conduct.pdf` → `Student Code of Conduct`. */
export const titleFromFile = (publicPath: string): string =>
  posix.basename(publicPath).replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim() || publicPath

function walk(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name.startsWith('.')) return []
    const p = join(dir, e.name)
    return e.isDirectory() ? walk(p) : e.isFile() ? [p] : []
  })
}

export type Planned = {
  publicPath: string
  source: string
  title: string
  category: Category
  audience: Audience
  listings: { section: DocumentSection; order: number }[]
}

/** What the step would write, from the files on disk. Pure apart from reading the directory tree. */
export function plan(publicDir = PUBLIC, held: Set<string> = loadHeld()): { planned: Planned[]; skipped: { path: string; reason: string }[] } {
  const files = new Map<string, string>() // public path → absolute file
  for (const s of STORES) for (const f of walk(join(publicDir, s))) {
    if (!/\.pdf$/i.test(f)) continue
    files.set('/' + relative(publicDir, f).split('\\').join('/'), f)
  }
  const skipped: { path: string; reason: string }[] = []
  for (const [from, to] of Object.entries(DOCUMENT_ALIASES)) {
    const src = files.get(from)
    if (!src) continue
    files.delete(from)
    if (files.has(to)) skipped.push({ path: from, reason: `alias of ${to} (served from that document)` })
    else {
      files.set(to, src)
      skipped.push({ path: from, reason: `imported as ${to}; the old URL is an alias` })
    }
  }

  const titles = new Map<string, string>(Object.entries(FORM_TITLES))
  const listings = new Map<string, Planned['listings']>()
  const positions: Partial<Record<DocumentSection, number>> = {}
  for (const [section, href, label] of PAGE_LINKS) {
    if (!titles.has(href)) titles.set(href, label)
    const order = (positions[section] = (positions[section] ?? 0) + 10)
    const list = listings.get(href) ?? []
    if (!list.some((l) => l.section === section)) list.push({ section, order })
    listings.set(href, list)
  }

  const planned: Planned[] = []
  for (const [publicPath, source] of [...files].sort(([a], [b]) => a.localeCompare(b))) {
    if (held.has(publicPath)) {
      skipped.push({ path: publicPath, reason: 'held: 404 on production (static-held.json)' })
      continue
    }
    planned.push({ publicPath, source, title: titles.get(publicPath) ?? titleFromFile(publicPath), ...classify(publicPath), listings: listings.get(publicPath) ?? [] })
  }
  return { planned, skipped }
}

function loadHeld(): Set<string> {
  const p = resolve(ROOT, 'scripts/import/seeds/static-held.json')
  return new Set(existsSync(p) ? (JSON.parse(readFileSync(p, 'utf8')) as { paths: string[] }).paths : [])
}

const sameListings = (a: Planned['listings'], b: { section?: string | null; order?: number | null }[] | null | undefined) =>
  JSON.stringify(a.map((l) => [l.section, l.order])) === JSON.stringify((b ?? []).map((l) => [l.section, Number(l.order ?? 0)]))

export async function run(ctx: ImportContext) {
  const { payload, report } = ctx
  const { planned, skipped } = plan()
  const missingLinks = PAGE_LINKS.map(([, href]) => href).filter((h, i, all) => all.indexOf(h) === i && !planned.some((p) => p.publicPath === h))
  for (const s of skipped) ctx.log(`skip ${s.path}: ${s.reason}`)
  report.skipped += skipped.length
  const byCategory: Record<string, number> = {}

  for (const p of planned) {
    if (!ctx.wanted(p.publicPath)) continue
    byCategory[p.category] = (byCategory[p.category] ?? 0) + 1
    const data = { title: p.title, category: p.category, audience: p.audience, publicPath: p.publicPath, listings: p.listings }
    try {
      const existing = (
        await payload.find({ collection: 'documents', where: { publicPath: { equals: p.publicPath } }, limit: 1, depth: 0, pagination: false, overrideAccess: true })
      ).docs[0]
      if (ctx.dry) {
        if (existing) report.updated++
        else report.created++
        continue
      }
      if (!existing) {
        await payload.create({ collection: 'documents', data, filePath: p.source, ...ctx.opts })
        report.created++
      } else if (ctx.args.force) {
        await payload.update({ collection: 'documents', id: existing.id, data, filePath: p.source, overwriteExistingFiles: true, ...ctx.opts })
        report.updated++
      } else if (
        existing.title !== p.title ||
        existing.category !== p.category ||
        existing.audience !== p.audience ||
        !sameListings(p.listings, existing.listings)
      ) {
        await payload.update({ collection: 'documents', id: existing.id, data: { title: p.title, category: p.category, audience: p.audience, listings: p.listings }, ...ctx.opts })
        report.updated++
      } else report.skipped++
    } catch (e) {
      report.failed.push({ id: p.publicPath, reason: e instanceof Error ? e.message : String(e) })
    }
  }

  if (!ctx.dry) await revalidateDocuments(ctx)
  return { planned: planned.length, byCategory, skippedList: skipped, pageLinksWithoutFile: missingLinks }
}

/** Imports skip the collection hooks (context.importing), so tell the running site to drop the `documents` cache tag. */
async function revalidateDocuments(ctx: ImportContext) {
  const secret = process.env.REVALIDATE_SECRET
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  if (!secret) return ctx.log('REVALIDATE_SECRET not set; documents cache not cleared')
  try {
    const res = await fetch(`${base}/api/revalidate/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-revalidate-secret': secret },
      body: JSON.stringify({ tags: ['documents', 'collection:documents'] }),
      signal: AbortSignal.timeout(10_000),
    })
    ctx.log(`documents cache tag cleared: ${res.status}`)
  } catch {
    ctx.log(`site not reachable at ${base}; documents cache not cleared`)
  }
}
