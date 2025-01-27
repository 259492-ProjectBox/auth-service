CREATE TABLE "programs" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_name_th" text NOT NULL,
	"program_name_en" text NOT NULL,
	"abbreviation" text NOT NULL,
	CONSTRAINT "program_name_th_key" UNIQUE("program_name_th"),
	CONSTRAINT "program_name_en_key" UNIQUE("program_name_en")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isActive" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "programs_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "createDate" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "updateDate" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "createBy" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_programs_id_fkey" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;