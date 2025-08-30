DROP INDEX "landing_pages_custom_domain_idx";--> statement-breakpoint
ALTER TABLE "hypotheses" ADD COLUMN "custom_domain" text;--> statement-breakpoint
ALTER TABLE "landing_pages" DROP COLUMN "custom_domain";