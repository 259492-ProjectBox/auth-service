import { pgTable, unique, uuid, text, timestamp, foreignKey, serial, integer, pgEnum ,boolean} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const accounttype = pgEnum("accounttype", ['StdAcc', 'AlumAcc', 'MISEmpAcc'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	cmuaccountname: text().notNull(),
	cmuaccount: text().notNull(),
	studentid: text(),
	prenameid: text(),
	prenameth: text(),
	prenameen: text(),
	firstnameth: text().notNull(),
	firstnameen: text().notNull(),
	lastnameth: text().notNull(),
	lastnameen: text().notNull(),
	organizationcode: text().notNull(),
	organizationnameth: text().notNull(),
	organizationnameen: text().notNull(),
	itAccounttype: accounttype("it_accounttype").notNull(),
	itAccounttypeth: text("it_accounttypeth").notNull(),
	itAccounttypeen: text("it_accounttypeen").notNull(),
	createdat: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedat: timestamp({ mode: 'string' }).defaultNow().notNull(),
	isActive: boolean().default(true).notNull(),
}, (table) => [
	unique("users_cmuaccount_unique").on(table.cmuaccount),
]);

export const userRoles = pgTable("user_roles", {
	id: serial().primaryKey().notNull(),
	userid: uuid().notNull(),
	roleid: integer().notNull(),
	programs_id: integer().notNull(),
	createDate : timestamp({ mode: 'string' }).defaultNow().notNull(),
	updateDate : timestamp({ mode: 'string' }).defaultNow().notNull(),
	createBy : text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userid],
			foreignColumns: [users.id],
			name: "user_roles_userid_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.roleid],
			foreignColumns: [roles.id],
			name: "user_roles_roleid_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.programid],
			foreignColumns: [program.id],
			name: "user_roles_programid_fkey"
		}).onDelete("cascade"),
	unique("user_roles_userid_roleid_unique").on(table.userid, table.roleid),
	foreignKey({
		columns: [table.programs_id],
		foreignColumns: [programs.id],
		name: "user_roles_programs_id_fkey"
	}).onDelete("cascade"),
	// create foreign key for createBy from user
	foreignKey({
		columns: [table.createBy],
		foreignColumns: [users.id],
		name: "user_roles_createBy_fkey"
	}).onDelete("cascade"),
]);

export const roles = pgTable("roles", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
}, (table) => [
	unique("roles_name_key").on(table.name),
]);

export const programs = pgTable("programs", {
	id: serial().primaryKey().notNull(),
	program_name_th : text().notNull(),
	program_name_en : text().notNull(),
	abbreviation: text().notNull(),
	// name: text().notNull(),
	// description: text(),
}, (table) => [
	unique("program_name_th_key").on(table.program_name_th),
	unique("program_name_en_key").on(table.program_name_en),

]);
