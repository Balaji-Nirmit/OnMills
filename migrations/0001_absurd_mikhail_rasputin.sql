ALTER TABLE "project_stages" RENAME TO "projectStatusTable";--> statement-breakpoint
ALTER TABLE "projectStatusTable" DROP CONSTRAINT "project_stages_project_id_name_unique";--> statement-breakpoint
ALTER TABLE "issues" DROP CONSTRAINT "issues_status_project_stages_id_fk";
--> statement-breakpoint
ALTER TABLE "projectStatusTable" DROP CONSTRAINT "project_stages_project_id_projectTable_id_fk";
--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_status_projectStatusTable_id_fk" FOREIGN KEY ("status") REFERENCES "public"."projectStatusTable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projectStatusTable" ADD CONSTRAINT "projectStatusTable_project_id_projectTable_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projectTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projectStatusTable" ADD CONSTRAINT "projectStatusTable_project_id_name_unique" UNIQUE("project_id","name");