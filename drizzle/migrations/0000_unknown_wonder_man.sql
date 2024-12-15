-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."accounttype" AS ENUM('StdAcc', 'AlumAcc', 'MISEmpAcc');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cmuaccountname" text NOT NULL,
	"cmuaccount" text NOT NULL,
	"studentid" text,
	"prenameid" text,
	"prenameth" text,
	"prenameen" text,
	"firstnameth" text NOT NULL,
	"firstnameen" text NOT NULL,
	"lastnameth" text NOT NULL,
	"lastnameen" text NOT NULL,
	"organizationcode" text NOT NULL,
	"organizationnameth" text NOT NULL,
	"organizationnameen" text NOT NULL,
	"it_accounttype" "accounttype" NOT NULL,
	"it_accounttypeth" text NOT NULL,
	"it_accounttypeen" text NOT NULL,
	"createdat" timestamp DEFAULT now() NOT NULL,
	"updatedat" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_cmuaccount_unique" UNIQUE("cmuaccount")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"userid" uuid NOT NULL,
	"roleid" integer NOT NULL,
	CONSTRAINT "user_roles_userid_roleid_unique" UNIQUE("userid","roleid")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "roles_name_key" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
*/