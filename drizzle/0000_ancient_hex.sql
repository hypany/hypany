CREATE TABLE "accounts" (
	"access_token" text,
	"access_token_expires_at" timestamp,
	"account_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"id_token" text,
	"password" text,
	"provider_id" text NOT NULL,
	"refresh_token" text,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"content_type" text,
	"created_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	"filename" text,
	"hypothesis_id" text,
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"size" text,
	"updated_at" timestamp NOT NULL,
	"url" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hypotheses" (
	"created_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	"description" text,
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_page_blocks" (
	"content" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	"id" text PRIMARY KEY NOT NULL,
	"landing_page_id" text NOT NULL,
	"order" text NOT NULL,
	"type" text NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_pages" (
	"created_at" timestamp NOT NULL,
	"custom_css" text,
	"custom_domain" text,
	"deleted_at" timestamp,
	"favicon" text,
	"hypothesis_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"meta_description" text,
	"meta_title" text,
	"og_image" text,
	"published_at" timestamp,
	"slug" text,
	"template" text DEFAULT 'default' NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "landing_pages_hypothesis_id_unique" UNIQUE("hypothesis_id"),
	CONSTRAINT "landing_pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "page_visits" (
	"created_at" timestamp NOT NULL,
	"hypothesis_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"landing_page_id" text NOT NULL,
	"path" text,
	"referrer" text,
	"user_agent" text,
	"visitor_id" text
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"created_at" timestamp NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"impersonated_by" text,
	"ip_address" text,
	"token" text NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"created_at" timestamp NOT NULL,
	"email_notifications" boolean DEFAULT true NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"onboarding_complete" boolean DEFAULT false NOT NULL,
	"theme" text DEFAULT 'system',
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"ban_expires" timestamp,
	"banned" boolean,
	"ban_reason" text,
	"created_at" timestamp NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"name" text NOT NULL,
	"role" text,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"created_at" timestamp,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"updated_at" timestamp,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waitlist_entries" (
	"created_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	"email" text NOT NULL,
	"email_revealed" boolean DEFAULT false NOT NULL,
	"email_verified" boolean DEFAULT false,
	"id" text PRIMARY KEY NOT NULL,
	"metadata" text,
	"name" text,
	"revealed_at" timestamp,
	"source" text,
	"updated_at" timestamp NOT NULL,
	"utm_campaign" text,
	"utm_content" text,
	"utm_medium" text,
	"utm_source" text,
	"utm_term" text,
	"visitor_id" text,
	"waitlist_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waitlists" (
	"created_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	"hypothesis_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "waitlists_hypothesis_id_unique" UNIQUE("hypothesis_id")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_hypothesis_id_hypotheses_id_fk" FOREIGN KEY ("hypothesis_id") REFERENCES "public"."hypotheses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hypotheses" ADD CONSTRAINT "hypotheses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_page_blocks" ADD CONSTRAINT "landing_page_blocks_landing_page_id_landing_pages_id_fk" FOREIGN KEY ("landing_page_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_hypothesis_id_hypotheses_id_fk" FOREIGN KEY ("hypothesis_id") REFERENCES "public"."hypotheses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_visits" ADD CONSTRAINT "page_visits_hypothesis_id_hypotheses_id_fk" FOREIGN KEY ("hypothesis_id") REFERENCES "public"."hypotheses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_visits" ADD CONSTRAINT "page_visits_landing_page_id_landing_pages_id_fk" FOREIGN KEY ("landing_page_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waitlist_entries" ADD CONSTRAINT "waitlist_entries_waitlist_id_waitlists_id_fk" FOREIGN KEY ("waitlist_id") REFERENCES "public"."waitlists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waitlists" ADD CONSTRAINT "waitlists_hypothesis_id_hypotheses_id_fk" FOREIGN KEY ("hypothesis_id") REFERENCES "public"."hypotheses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "assets_hypothesis_id_idx" ON "assets" USING btree ("hypothesis_id");--> statement-breakpoint
CREATE UNIQUE INDEX "assets_key_unique" ON "assets" USING btree ("key");--> statement-breakpoint
CREATE INDEX "assets_user_id_idx" ON "assets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "hypotheses_user_id_idx" ON "hypotheses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "landing_page_blocks_landing_page_id_idx" ON "landing_page_blocks" USING btree ("landing_page_id");--> statement-breakpoint
CREATE INDEX "landing_pages_custom_domain_idx" ON "landing_pages" USING btree ("custom_domain");--> statement-breakpoint
CREATE INDEX "landing_pages_hypothesis_id_idx" ON "landing_pages" USING btree ("hypothesis_id");--> statement-breakpoint
CREATE INDEX "page_visits_created_at_idx" ON "page_visits" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "page_visits_hypothesis_idx" ON "page_visits" USING btree ("hypothesis_id");--> statement-breakpoint
CREATE INDEX "page_visits_landing_page_idx" ON "page_visits" USING btree ("landing_page_id");--> statement-breakpoint
CREATE INDEX "page_visits_visitor_idx" ON "page_visits" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "sessions_token_idx" ON "sessions" USING btree ("token");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_settings_user_id_idx" ON "user_settings" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_settings_user_id_unique_idx" ON "user_settings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "waitlist_entries_visitor_idx" ON "waitlist_entries" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "waitlist_entries_waitlist_id_created_at_idx" ON "waitlist_entries" USING btree ("waitlist_id","created_at");--> statement-breakpoint
CREATE INDEX "waitlist_entries_waitlist_id_idx" ON "waitlist_entries" USING btree ("waitlist_id");--> statement-breakpoint
CREATE INDEX "waitlists_hypothesis_id_idx" ON "waitlists" USING btree ("hypothesis_id");