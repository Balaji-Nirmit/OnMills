CREATE TYPE "public"."issue_priority" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT');--> statement-breakpoint
CREATE TYPE "public"."issue_status" AS ENUM('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE');--> statement-breakpoint
CREATE TYPE "public"."sprint_status" AS ENUM('PLANNED', 'ACTIVE', 'COMPLETED');--> statement-breakpoint
CREATE TABLE "issues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" "issue_status" NOT NULL,
	"order" integer NOT NULL,
	"priority" "issue_priority" NOT NULL,
	"assignee_id" uuid,
	"reporter_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"sprint_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projectTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"key" text NOT NULL,
	"description" text,
	"organization_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projectTable_organization_id_key_unique" UNIQUE("organization_id","key")
);
--> statement-breakpoint
CREATE TABLE "sprintTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"status" "sprint_status" DEFAULT 'PLANNED' NOT NULL,
	"project_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sprintTable_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "userTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"profile_image_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "userTable_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "userTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_assignee_id_userTable_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."userTable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_reporter_id_userTable_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."userTable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_project_id_projectTable_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projectTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_sprint_id_sprintTable_id_fk" FOREIGN KEY ("sprint_id") REFERENCES "public"."sprintTable"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sprintTable" ADD CONSTRAINT "sprintTable_project_id_projectTable_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projectTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "status_order_idx" ON "issues" USING btree ("status","order");