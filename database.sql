DROP TABLE IF EXISTS user_roles , users , roles;
DROP TYPE IF EXISTS AccountType;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Enum for AccountType
CREATE TYPE AccountType AS ENUM ('StdAcc', 'AlumAcc', 'MISEmpAcc');

-- Table for users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cmuAccountName TEXT NOT NULL,
    cmuAccount TEXT UNIQUE NOT NULL,
    studentId TEXT,
    prenameId TEXT,
    prenameTH TEXT,
    prenameEN TEXT,
    firstNameTH TEXT NOT NULL,
    firstNameEN TEXT NOT NULL,
    lastNameTH TEXT NOT NULL,
    lastNameEN TEXT NOT NULL,
    organizationCode TEXT NOT NULL,
    organizationNameTH TEXT NOT NULL,
    organizationNameEN TEXT NOT NULL,
    it_accountType AccountType NOT NULL,
    it_accountTypeTH TEXT NOT NULL,
    it_accountTypeEN TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT now() NOT NULL,
    updatedAt TIMESTAMP DEFAULT now() NOT NULL,
    CONSTRAINT users_cmuAccount_unique UNIQUE (cmuAccount)
);

-- Table for roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT
);

-- Table for user_roles (junction table)
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    userId UUID NOT NULL,
    roleId INT NOT NULL,
    CONSTRAINT user_roles_userId_roleId_unique UNIQUE (userId, roleId),
    CONSTRAINT user_roles_userId_fkey FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT user_roles_roleId_fkey FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE CASCADE
);

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

INSERT INTO roles (name, description) VALUES ('admin', 'Admin role' ), ('student' , 'Student role' ), ('alumni' , 'Alumni role' ), ('mis_employee' , 'MIS Employee role' ) , ('platform_admin' , 'Platform Admin role' );


CREATE TABLE "program" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "program_name_key" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "user_roles" ADD COLUMN "programid" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_programid_fkey" FOREIGN KEY ("programid") REFERENCES "public"."program"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "user_roles" ALTER COLUMN "programid" DROP NOT NULL;
ALTER TABLE "program" ADD COLUMN "description" text;


INSERT INTO "program" ("name" , "description") VALUES ('ME' , 'เครื่องกล'), ('IE' ,'อุตสาหการ'), ('EE', 'ไฟฟ้า'), ('CE' ,'โยธา'), ('ENVI' , 'สิ่งแวดล้อม'), ('CPE' , 'คอมพิวเตอร์'), ('REAI' , 'หุ่นยนต์และปัญญาประดิษฐ์'), ('ISNE', 'สาระสนเทศเเละเครือข่าย')