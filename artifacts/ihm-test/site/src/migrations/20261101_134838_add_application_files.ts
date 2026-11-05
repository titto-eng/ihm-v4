import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "application_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"public_id" varchar NOT NULL,
  	"form_key" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "application_files_id" integer;
  CREATE UNIQUE INDEX "application_files_public_id_idx" ON "application_files" USING btree ("public_id");
  CREATE INDEX "application_files_form_key_idx" ON "application_files" USING btree ("form_key");
  CREATE INDEX "application_files_updated_at_idx" ON "application_files" USING btree ("updated_at");
  CREATE INDEX "application_files_created_at_idx" ON "application_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "application_files_filename_idx" ON "application_files" USING btree ("filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_application_files_fk" FOREIGN KEY ("application_files_id") REFERENCES "public"."application_files"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_application_files_id_idx" ON "payload_locked_documents_rels" USING btree ("application_files_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "application_files" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "application_files" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_application_files_fk";
  
  DROP INDEX "payload_locked_documents_rels_application_files_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "application_files_id";`)
}
