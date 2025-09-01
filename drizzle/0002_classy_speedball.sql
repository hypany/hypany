CREATE TABLE "landing_page_versions" (
	"id" text PRIMARY KEY NOT NULL,
	"landing_page_id" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"snapshot_json" text NOT NULL,
	"author_id" text,
	"message" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN "builder_draft_json" text;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN "builder_published_json" text;--> statement-breakpoint
ALTER TABLE "landing_page_versions" ADD CONSTRAINT "landing_page_versions_landing_page_id_landing_pages_id_fk" FOREIGN KEY ("landing_page_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_page_versions" ADD CONSTRAINT "landing_page_versions_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "landing_page_versions_landing_page_id_idx" ON "landing_page_versions" USING btree ("landing_page_id");--> statement-breakpoint
CREATE INDEX "landing_page_versions_created_at_idx" ON "landing_page_versions" USING btree ("created_at");