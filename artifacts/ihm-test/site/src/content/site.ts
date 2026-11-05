// Site settings (was the siteSettings global). Hand-edited since the 2026-10-19 cut (no CMS global behind it). Keep it plain data.

export const site = {
  siteName: 'Institute of Health and Management',
  shortName: 'IHM',
  titleTemplate: '%s | IHM',
  defaultDescription: 'Nursing and health management courses at the Institute of Health and Management (IHM), with campuses in Melbourne, Sydney, Brisbane and Perth.',
  phone: '1800 763 757',
  email: 'enquiry@ihm.edu.au',
  whatsappNumber: null,
  logo: null,
  defaultOgImage: null,
  organisation: { cricos: '03407G', teqsa: 'PRV14040', abn: '19 155 760 437', address: null },
  courseGuidePdf: '/pdf/IHM_Course_Guide.pdf',
  defaultFormKey: 'quick-enquiry',
  quickContactHiddenPaths: [],
  announcement: { active: false, text: null, link: null },
  tracking: { gtmId: null, clarityId: null, hubspotPortalId: null, hubspotRegion: 'na1', airgenticId: null },
  allowedEmbedHosts: ['my.matterport.com', 'forms.monday.com', 'portal.ihm.edu.au', 'student.ihm.edu.au', 'superform.spot-nik.com', 'crm.industryhub.ihna.edu.au', 'healthcareers.elmotalent.com.au'],
} as const

export type Site = typeof site
