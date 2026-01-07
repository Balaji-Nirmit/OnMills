ALTER TABLE "issues" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."issue_status";--> statement-breakpoint
CREATE TYPE "public"."issue_status" AS ENUM('TODO', 'PURCHASE', 'STORE', 'BUFFING', 'PAINTING', 'WINDING', 'ASSEMBLY', 'PACKING', 'SALES');--> statement-breakpoint
ALTER TABLE "issues" ALTER COLUMN "status" SET DATA TYPE "public"."issue_status" USING "status"::"public"."issue_status";