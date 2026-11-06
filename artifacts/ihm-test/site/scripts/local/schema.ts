import { getPayload } from 'payload'
import config from '../../src/payload.config'
import { assertLocalDatabase } from './env.mjs'

assertLocalDatabase(process.env.DATABASE_URL)
if (process.env.LOCAL_DEV !== '1' || process.env.DISABLE_DB_PUSH !== '0') throw new Error('Use npm run local:schema')
console.log('Applying Payload schema to the isolated local database only. Review any destructive-change prompts carefully.')
const payload = await getPayload({ config })
await payload.destroy()
console.log('Local schema is ready.')
process.exit(0) // Drizzle introspection may retain an otherwise idle connection.
