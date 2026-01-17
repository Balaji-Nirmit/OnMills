CREATE TABLE "itemTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"project_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "issues" RENAME COLUMN "title" TO "item_id";--> statement-breakpoint
ALTER TABLE "itemTable" ADD CONSTRAINT "itemTable_project_id_projectTable_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projectTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_item_id_itemTable_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."itemTable"("id") ON DELETE cascade ON UPDATE no action;