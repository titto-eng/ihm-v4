import * as migration_20261019_101350_cut_pages_to_code from './20261019_101350_cut_pages_to_code';
import * as migration_20261020_071125_add_course_facts from './20261020_071125_add_course_facts';
import * as migration_20261020_071535_add_documents from './20261020_071535_add_documents';
import * as migration_20261021_052301_add_course_brochure from './20261021_052301_add_course_brochure';
import * as migration_20261101_134838_add_application_files from './20261101_134838_add_application_files';

export const migrations = [
  {
    up: migration_20261019_101350_cut_pages_to_code.up,
    down: migration_20261019_101350_cut_pages_to_code.down,
    name: '20261019_101350_cut_pages_to_code',
  },
  {
    up: migration_20261020_071125_add_course_facts.up,
    down: migration_20261020_071125_add_course_facts.down,
    name: '20261020_071125_add_course_facts',
  },
  {
    up: migration_20261020_071535_add_documents.up,
    down: migration_20261020_071535_add_documents.down,
    name: '20261020_071535_add_documents',
  },
  {
    up: migration_20261021_052301_add_course_brochure.up,
    down: migration_20261021_052301_add_course_brochure.down,
    name: '20261021_052301_add_course_brochure',
  },
  {
    up: migration_20261101_134838_add_application_files.up,
    down: migration_20261101_134838_add_application_files.down,
    name: '20261101_134838_add_application_files'
  },
];
