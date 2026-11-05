import type { CollectionConfig } from 'payload'
import { Users } from './Users'
import { Media } from './Media'
import { Courses } from './Courses'
import { lookups } from './Lookups'
import { Posts } from './Posts'
import { Events } from './Events'
import { Testimonials } from './Testimonials'
import { Staff } from './Staff'
import { Enquiries } from './Enquiries'
import { Products } from './Products'
import { Payments } from './Payments'
import { Alumni } from './Alumni'
import { Documents } from './Documents'
import { ApplicationFiles } from './ApplicationFiles'

// 10-content-model §2, after the 2026-10-19 cut: pages, landing pages, campaigns, form definitions and redirects are code
// (src/app/(site)/**, src/content/*). The CMS keeps what changes often or is many: courses, posts, events, staff, media, lookups,
// testimonials, and the enquiry / payment records.
export const collections: CollectionConfig[] = [
  Users, Alumni, Media, Documents, Courses, Posts, ...lookups, Events, Testimonials, Staff, Enquiries, ApplicationFiles, Products, Payments,
]
