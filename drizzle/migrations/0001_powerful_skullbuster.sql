CREATE TABLE "program" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "program_name_key" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "programid" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_programid_fkey" FOREIGN KEY ("programid") REFERENCES "public"."program"("id") ON DELETE cascade ON UPDATE no action;