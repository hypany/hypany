ALTER TABLE "landing_pages" DROP CONSTRAINT "landing_pages_slug_unique";--> statement-breakpoint
ALTER TABLE "hypotheses" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "landing_pages" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "hypotheses" ADD CONSTRAINT "hypotheses_slug_unique" UNIQUE("slug");