import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_documents_category" ADD VALUE 'brochure' BEFORE 'other';
  ALTER TABLE "courses" ADD COLUMN "brochure_id" integer;
  ALTER TABLE "_courses_v" ADD COLUMN "version_brochure_id" integer;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_brochure_id_documents_id_fk" FOREIGN KEY ("brochure_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_brochure_id_documents_id_fk" FOREIGN KEY ("version_brochure_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "courses_brochure_idx" ON "courses" USING btree ("brochure_id");
  CREATE INDEX "_courses_v_version_version_brochure_idx" ON "_courses_v" USING btree ("version_brochure_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses" DROP CONSTRAINT "courses_brochure_id_documents_id_fk";
  
  ALTER TABLE "_courses_v" DROP CONSTRAINT "_courses_v_version_brochure_id_documents_id_fk";
  
  UPDATE "documents" SET "category" = 'other' WHERE "category" = 'brochure';
  ALTER TABLE "documents" ALTER COLUMN "category" SET DATA TYPE text;
  ALTER TABLE "documents" ALTER COLUMN "category" SET DEFAULT 'policy'::text;
  DROP TYPE "public"."enum_documents_category";
  CREATE TYPE "public"."enum_documents_category" AS ENUM('policy', 'procedure', 'staff-policy', 'form', 'guide', 'handbook', 'other');
  ALTER TABLE "documents" ALTER COLUMN "category" SET DEFAULT 'policy'::"public"."enum_documents_category";
  ALTER TABLE "documents" ALTER COLUMN "category" SET DATA TYPE "public"."enum_documents_category" USING "category"::"public"."enum_documents_category";
  DROP INDEX "courses_brochure_idx";
  DROP INDEX "_courses_v_version_version_brochure_idx";
  ALTER TABLE "courses" DROP COLUMN "brochure_id";
  ALTER TABLE "_courses_v" DROP COLUMN "version_brochure_id";`)
}
