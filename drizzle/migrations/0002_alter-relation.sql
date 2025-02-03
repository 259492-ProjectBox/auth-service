ALTER TABLE "program" RENAME TO "programs";--> statement-breakpoint
ALTER TABLE "user_roles" RENAME COLUMN "programid" TO "programs_id";--> statement-breakpoint
ALTER TABLE "programs" DROP CONSTRAINT "program_name_key";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_cmuaccount_unique";--> statement-breakpoint
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_programid_fkey";
--> statement-breakpoint
ALTER TABLE "programs" ADD COLUMN "program_name_th" text NOT NULL;--> statement-breakpoint
ALTER TABLE "programs" ADD COLUMN "program_name_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "programs" ADD COLUMN "abbreviation" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "createdate" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "updatedate" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "createby" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isactive" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_programs_id_fkey" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_createby_fkey" FOREIGN KEY ("createby") REFERENCES "public"."users"("cmuaccount") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programs" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "programs" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "programs" ADD CONSTRAINT "program_name_th_key" UNIQUE("program_name_th");--> statement-breakpoint
ALTER TABLE "programs" ADD CONSTRAINT "program_name_en_key" UNIQUE("program_name_en");--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_unique" UNIQUE("userid","roleid","programs_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_cmuaccount_key" UNIQUE("cmuaccount");