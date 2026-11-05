-- Run ONCE on the production database, right after restoring the handover dump (docs/DEPLOYMENT.md §4).
--
-- The dump comes from a development database whose tables were created by `npm run dev` (Payload's dev schema push), so its
-- payload_migrations table holds a single "dev" marker row (batch -1). The migrations in src/migrations/ are already reflected
-- in that schema. This script records them as applied, so that later `npm run payload migrate` runs apply only NEW migrations
-- and do not stop to ask about the dev marker.
--
-- When a new migration is added to src/migrations/ before the first deploy, add its name to the list below.

BEGIN;

DELETE FROM payload_migrations WHERE name = 'dev' OR batch = -1;

INSERT INTO payload_migrations (name, batch, updated_at, created_at)
SELECT m.name, 1, now(), now()
FROM (VALUES
  ('20261019_101350_cut_pages_to_code'),
  ('20261020_071125_add_course_facts'),
  ('20261020_071535_add_documents'),
  ('20261021_052301_add_course_brochure'),
  ('20261101_134838_add_application_files')
) AS m(name)
WHERE NOT EXISTS (SELECT 1 FROM payload_migrations p WHERE p.name = m.name);

COMMIT;

SELECT name, batch FROM payload_migrations ORDER BY id;
