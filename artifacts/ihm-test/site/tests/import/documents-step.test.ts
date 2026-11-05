import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { categoryFromName, classify, plan, titleFromFile } from '../../scripts/import/steps/documents'

// The `documents` import step's planning (no database): folders → category/audience, titles from the policies page, held files,
// and the alias rename of the ampersand Fraud policy.

describe('documents import: classification', () => {
  it('uses the folder for policies, procedures, staff and handbooks', () => {
    expect(classify('/pdf/policies/X.pdf')).toEqual({ category: 'policy', audience: 'students' })
    expect(classify('/pdf/procedures/X.pdf')).toEqual({ category: 'procedure', audience: 'students' })
    expect(classify('/pdf/IHM_Policies_and_Procedures_for_Staff/X_Procedure.pdf')).toEqual({ category: 'staff-policy', audience: 'staff' })
    expect(classify('/International-SHB/International-SHB.pdf')).toEqual({ category: 'handbook', audience: 'students' })
    expect(classify('/brochures/IHM_NEW_Brochures/BON.pdf').category).toBe('brochure')
  })
  it('guesses loose files from the name', () => {
    expect(categoryFromName('IHM_Conflict_of_Interest_Declaration_Form.pdf')).toBe('form')
    expect(categoryFromName('Learning_Access_Plan.pdf')).toBe('form')
    expect(categoryFromName('IHM_Registration_Information.pdf')).toBe('guide')
    expect(categoryFromName('What-documents-do-I-need-to-submit-for-a-FEE-HELP-application.pdf')).toBe('guide')
    expect(categoryFromName('Glossary_of_Terms_Feb_2026.pdf')).toBe('guide')
    expect(categoryFromName('BSW Handbook 2026.pdf')).toBe('handbook')
    expect(categoryFromName('corporate_thing.pdf')).toBe('other')
  })
  it('cleans file names into titles', () => {
    expect(titleFromFile('/pdf/Fee-Help/How-do-I-apply.pdf')).toBe('How do I apply')
    expect(titleFromFile('/pdf/IHM_Prospectus 1.pdf')).toBe('IHM Prospectus 1')
  })
})

describe('documents import: plan', () => {
  const root = mkdtempSync(join(tmpdir(), 'docplan-'))
  const put = (p: string) => {
    mkdirSync(dirname(join(root, p)), { recursive: true })
    writeFileSync(join(root, p), '%PDF-1.4')
  }
  for (const p of [
    'pdf/policies/Academic_Honesty_and_Integrity_Policy.pdf',
    'pdf/policies/Academic_Honesty_and_Integrity_Policy_old.pdf',
    'pdf/policies/Fraud&Corruption_Prevention&Control_Policy.pdf',
    'pdf/Glossary_of_Terms_Feb_2026.pdf',
    'pdf/readme.txt',
    'IHM_Domestic_SHB/IHM_Domestic_SHB.pdf',
    'IHM_Domestic_SHB/Domestic-SHB.pdf',
    'brochures/IHM_NEW_Brochures/BON.pdf',
  ]) put(p)
  const { planned, skipped } = plan(root, new Set(['/pdf/policies/Academic_Honesty_and_Integrity_Policy_old.pdf']))
  const by = new Map(planned.map((p) => [p.publicPath, p]))

  it('creates one row per PDF, skipping held files, non-PDFs and alias names', () => {
    expect([...by.keys()].sort()).toEqual([
      '/IHM_Domestic_SHB/IHM_Domestic_SHB.pdf',
      '/brochures/IHM_NEW_Brochures/BON.pdf',
      '/pdf/Glossary_of_Terms_Feb_2026.pdf',
      '/pdf/policies/Academic_Honesty_and_Integrity_Policy.pdf',
      '/pdf/policies/Fraud_and_Corruption_Prevention_and_Control_Policy.pdf',
    ])
    expect(skipped.map((s) => s.path).sort()).toEqual([
      '/IHM_Domestic_SHB/Domestic-SHB.pdf',
      '/pdf/policies/Academic_Honesty_and_Integrity_Policy_old.pdf',
      '/pdf/policies/Fraud&Corruption_Prevention&Control_Policy.pdf',
    ])
  })
  it('imports the ampersand Fraud policy file under its clean path, with the page title and listing', () => {
    const fraud = by.get('/pdf/policies/Fraud_and_Corruption_Prevention_and_Control_Policy.pdf')!
    expect(fraud.source.endsWith('Fraud&Corruption_Prevention&Control_Policy.pdf')).toBe(true)
    expect(fraud.title).toBe('Fraud and Corruption Prevention and Control Policy')
    expect(fraud.listings).toEqual([{ section: 'student-policies', order: expect.any(Number) }])
  })
  it('takes titles and per-tab listings from the page links', () => {
    const ah = by.get('/pdf/policies/Academic_Honesty_and_Integrity_Policy.pdf')!
    expect(ah.title).toBe('Academic Honesty and Integrity Policy')
    expect(ah.listings.map((l) => l.section).sort()).toEqual(['staff-policies', 'student-policies'])
    expect(by.get('/pdf/Glossary_of_Terms_Feb_2026.pdf')!.title).toBe('IHM Glossary of Terms')
    expect(by.get('/brochures/IHM_NEW_Brochures/BON.pdf')!.listings).toEqual([])
  })
})
