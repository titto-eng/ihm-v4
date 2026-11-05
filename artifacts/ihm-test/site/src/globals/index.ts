import type { GlobalConfig } from 'payload'
import { CourseShared } from './CourseShared'

// Header, footer, site settings and enquiry routing are code since the 2026-10-19 cut (src/content/{nav,footer,site,enquiry-routing}.ts).
export const globals: GlobalConfig[] = [CourseShared]
