import { relations } from "drizzle-orm/relations";
import { users, userRoles, roles, program } from "./schema";

export const userRolesRelations = relations(userRoles, ({one}) => ({
	user: one(users, {
		fields: [userRoles.userid],
		references: [users.id]
	}),
	role: one(roles, {
		fields: [userRoles.roleid],
		references: [roles.id]
	}),
	program: one(program, {
		fields: [userRoles.programid],
		references: [program.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	userRoles: many(userRoles),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	userRoles: many(userRoles),
}));

export const programRelations = relations(program, ({many}) => ({
	userRoles: many(userRoles),
}));