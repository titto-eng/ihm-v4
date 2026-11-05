import { describe, expect, it } from 'vitest'
import { sniffType } from '@/lib/enquiries/upload'
import { buildEnquirySchema } from '@/lib/enquiries/schema'
import { forms } from '@/content/forms'

// 40-enquiries §4a: the type of an uploaded file comes from its first bytes; the name only tells DOC from DOCX containers.
const bytes = (...b: number[]) => Uint8Array.from([...b, 0, 0, 0, 0, 0, 0, 0, 0].slice(0, 8))

describe('upload type sniffing', () => {
  it('accepts PDF, DOC and DOCX by signature', () => {
    expect(sniffType(bytes(0x25, 0x50, 0x44, 0x46, 0x2d), 'cv.pdf')).toBe('application/pdf')
    expect(sniffType(bytes(0x25, 0x50, 0x44, 0x46), 'renamed.docx')).toBe('application/pdf')
    expect(sniffType(bytes(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1), 'cv.doc')).toBe('application/msword')
    expect(sniffType(bytes(0x50, 0x4b, 0x03, 0x04), 'cv.docx')).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  })

  it('refuses anything else, whatever its name', () => {
    expect(sniffType(bytes(0x4d, 0x5a), 'cv.pdf')).toBeNull() // an executable
    expect(sniffType(bytes(0x50, 0x4b, 0x03, 0x04), 'archive.zip')).toBeNull()
    expect(sniffType(bytes(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1), 'sheet.xls')).toBeNull()
    expect(sniffType(new Uint8Array(0), 'cv.pdf')).toBeNull()
  })
})

describe('adjunct-application form', () => {
  const def = forms.find((f) => f.key === 'adjunct-application')!
  const schema = buildEnquirySchema(def)
  const valid = {
    name: 'Dr Jane Citizen', email: 'jane@example.com', phone: '0400 000 000', postalAddress: '1 Test St, Melbourne VIC 3000',
    applicationOrigin: 'self', appointmentType: 'research-only', adjunctLevel: 'professor', hostSchool: 'School of Nursing',
    cv: 'a'.repeat(24), declarationTrue: true, declarationUnpaid: true, declarationPolicies: true, declarationChecks: true,
    declarationAttribution: true, declarationConflicts: true,
  }

  it('has one required file field and the six required declarations of the live form', () => {
    expect(def.fields.filter((f) => f.type === 'file').map((f) => f.name)).toEqual(['cv'])
    expect(def.fields.filter((f) => f.type === 'checkbox' && f.required)).toHaveLength(6)
    expect(schema.safeParse(valid).success).toBe(true)
  })

  it('rejects a missing or malformed file reference, an unticked declaration and a bad ORCID', () => {
    expect(schema.safeParse({ ...valid, cv: '' }).success).toBe(false)
    expect(schema.safeParse({ ...valid, cv: '../../etc/passwd' }).success).toBe(false)
    expect(schema.safeParse({ ...valid, declarationConflicts: false }).success).toBe(false)
    expect(schema.safeParse({ ...valid, orcid: '0000-0002-1825-0097' }).success).toBe(true)
    expect(schema.safeParse({ ...valid, orcid: '12345' }).success).toBe(false)
  })
})
