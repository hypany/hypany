ALTER TABLE "landing_pages" DROP CONSTRAINT "landing_pages_hypothesis_id_unique";--> statement-breakpoint
ALTER TABLE "landing_pages" ADD COLUMN "name" text;
