ALTER TABLE "user_settings" ADD COLUMN "marketing_emails" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user_settings" ADD COLUMN "marketing_email_language" text DEFAULT 'en';--> statement-breakpoint
ALTER TABLE "waitlist_entries" ADD COLUMN "landing_page_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "waitlist_entries" ADD CONSTRAINT "waitlist_entries_landing_page_id_landing_pages_id_fk" FOREIGN KEY ("landing_page_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "waitlist_entries_landing_page_id_idx" ON "waitlist_entries" USING btree ("landing_page_id");--> statement-breakpoint
ALTER TABLE "user_settings" DROP COLUMN "theme";--> statement-breakpoint
ALTER TABLE "waitlist_entries" DROP COLUMN "email_revealed";--> statement-breakpoint
ALTER TABLE "waitlist_entries" DROP COLUMN "revealed_at";