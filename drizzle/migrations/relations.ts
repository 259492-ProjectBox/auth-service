import { relations } from "drizzle-orm/relations";
import { users, userRoles, roles, programs } from "./schema";

export const userRolesRelations = relations(userRoles, ({one}) => ({
	user_userid: one(users, {
		fields: [userRoles.userid],
		references: [users.id],
		relationName: "userRoles_userid_users_id"
	}),
	role: one(roles, {
		fields: [userRoles.roleid],
		references: [roles.id]
	}),
	program: one(programs, {
		fields: [userRoles.programsId],
		references: [programs.id]
	}),
	user_createby: one(users, {
		fields: [userRoles.createby],
		references: [users.cmuaccount],
		relationName: "userRoles_createby_users_cmuaccount"
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	userRoles_userid: many(userRoles, {
		relationName: "userRoles_userid_users_id"
	}),
	userRoles_createby: many(userRoles, {
		relationName: "userRoles_createby_users_cmuaccount"
	}),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	userRoles: many(userRoles),
}));

export const programsRelations = relations(programs, ({many}) => ({
	userRoles: many(userRoles),
}));