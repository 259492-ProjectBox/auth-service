import { pgTable, unique, uuid, text, boolean, timestamp, foreignKey, serial, integer, varchar, pgEnum } from "drizzle-orm/pg-core"
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
	isactive: boolean().default(true).notNull(),
	createdat: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedat: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_cmuaccount_key").on(table.cmuaccount),
]);

export const userRoles = pgTable("user_roles", {
	id: serial().primaryKey().notNull(),
	userid: uuid().notNull(),
	roleid: integer().notNull(),
	programsId: integer("programs_id"),
	createdate: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedate: timestamp({ mode: 'string' }).defaultNow().notNull(),
	createby: varchar({ length: 255 }),
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
			columns: [table.programsId],
			foreignColumns: [programs.id],
			name: "user_roles_programs_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.createby],
			foreignColumns: [users.cmuaccount],
			name: "user_roles_createby_fkey"
		}).onDelete("cascade"),
	unique("user_roles_userid_roleid_unique").on(table.userid, table.roleid),
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
	programNameTh: text("program_name_th").notNull(),
	programNameEn: text("program_name_en").notNull(),
	abbreviation: text().notNull(),
}, (table) => [
	unique("program_name_th_key").on(table.programNameTh),
	unique("program_name_en_key").on(table.programNameEn),
]);
