import { randomBytes } from 'node:crypto'
import type { Payload } from 'payload'
import { APPLICATION_FILE_MAX_BYTES, APPLICATION_FILE_TYPES } from '@/collections/ApplicationFiles'
import { loadFormDefinition } from './lookups'
import { rateLimit } from './rateLimit'
import { clientIp } from './request'
import type { EnquireResponse } from './process'

// `POST /api/enquire/upload/` (40-enquiries §4a): one file for a form that has a `file` field. Saved first (rule 2) to the private
// `application-files` collection; the answer is the file's reference, which the browser then sends as that field's value with the
// enquiry. The type is decided from the file's first bytes, never from the name or the browser's content type.
export const UPLOAD_RATE_LIMIT = 5

type Kind = keyof typeof APPLICATION_FILE_TYPES
/** PDF (`%PDF`), legacy Word (OLE2 compound file) or DOCX (a ZIP whose name ends .docx). */
export function sniffType(head: Uint8Array, name: string): Kind | null {
  const starts = (sig: number[]) => sig.every((b, i) => head[i] === b)
  if (starts([0x25, 0x50, 0x44, 0x46])) return 'application/pdf'
  if (starts([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]) && /\.doc$/i.test(name)) return 'application/msword'
  if (starts([0x50, 0x4b, 0x03, 0x04]) && /\.docx$/i.test(name)) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  return null
}

const fail = (status: number, error: string, message: string, headers?: Record<string, string>): EnquireResponse => ({ status, body: { ok: false, error, message }, headers })

export async function handleUpload(args: { payload: Payload; form: FormData; headers: Headers }): Promise<EnquireResponse> {
  const { payload, form, headers } = args
  const formKey = form.get('formKey')
  const fieldName = form.get('field')
  const file = form.get('file')
  if (typeof formKey !== 'string' || typeof fieldName !== 'string' || !(file instanceof File)) return fail(400, 'validation', 'Choose a file to upload.')

  const rate = await rateLimit(payload, clientIp(headers), `upload:${formKey}`, { limit: UPLOAD_RATE_LIMIT })
  if (!rate.allowed) return fail(429, 'rate_limited', 'Too many uploads. Please wait a minute and try again.', { 'Retry-After': String(rate.retryAfterSeconds) })

  const def = await loadFormDefinition(payload, formKey)
  if (!def || !def.fields.some((f) => f.name === fieldName && f.type === 'file')) return fail(400, 'unknown_form', 'This form does not accept files.')

  if (file.size === 0) return fail(400, 'validation', 'The file is empty. Please choose a valid file.')
  if (file.size > APPLICATION_FILE_MAX_BYTES) return fail(413, 'too_large', 'The file must be 10MB or smaller.')
  const buf = Buffer.from(await file.arrayBuffer())
  const type = sniffType(buf.subarray(0, 8), file.name)
  if (!type) return fail(400, 'validation', 'Please upload a PDF, DOC or DOCX file.')

  const publicId = randomBytes(12).toString('hex')
  try {
    await payload.create({
      collection: 'application-files',
      overrideAccess: true,
      data: { publicId, formKey },
      file: { data: buf, mimetype: type, name: `${formKey}-${publicId}.${APPLICATION_FILE_TYPES[type]}`, size: buf.length },
    })
  } catch (e) {
    // Payload checks the file type again from its content; a file that passes the sniff but not that check is not a real document.
    if ((e as { name?: string } | null)?.name === 'ValidationError') return fail(400, 'validation', 'Please upload a valid PDF, DOC or DOCX file.')
    console.error('[enquire] upload not stored', e instanceof Error ? e.message : e)
    return fail(500, 'save_failed', 'We could not save your file. Please try again in a moment.')
  }
  return { status: 200, body: { ok: true, file: publicId, name: file.name.slice(0, 120) } }
}
