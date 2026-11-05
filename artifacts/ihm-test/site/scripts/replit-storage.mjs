import { Storage } from '@google-cloud/storage'
export const storage = new Storage({
  credentials: {
    audience: 'replit', subject_token_type: 'access_token',
    token_url: 'http://127.0.0.1:1106/token', type: 'external_account',
    credential_source: { url: 'http://127.0.0.1:1106/credential', format: { type: 'json', subject_token_field_name: 'access_token' } },
    universe_domain: 'googleapis.com',
  },
  projectId: '',
})
export function bucket() {
  if (!process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID) throw new Error('App Storage is required')
  return storage.bucket(process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID)
}
