import { dbcontext } from "../../utils/drizzle";
import { eq, and } from "drizzle-orm";
import {  userRoles, users } from "../../drizzle/migrations/schema";

export async function checkIsPlatformAdminByUserId(userId: string): Promise<boolean> {
	// Query the user_roles table to check if the user has roleId = 1
	const role = await dbcontext
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userid, userId), eq(userRoles.roleid, 5))).then((data) => data?.length > 0);

	return role;
}

export async function checkIsPlatformAdminByCMUAccount(cmuAccount: string): Promise<boolean> {
	// check if user is exits
	const user = await dbcontext.query.users.findFirst({
		where: eq(users.cmuaccount, cmuAccount),
	});
	
	if (!user) {
		return false;
	}
	// Query the user_roles table to check if the user has roleId = 1
	const role = await dbcontext
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userid, user.id), eq(userRoles.roleid, 5))).then((data) => data?.length > 0);

	return role;
	
}
export async function checkIsPlatformAdminByUserId(userId: string): Promise<boolean> {
	// Query the user_roles table to check if the user has roleId = 1
	const role = await dbcontext
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userid, userId), eq(userRoles.roleid, 5))).then((data) => data?.length > 0);

	return role;
}

export async function checkIsPlatformAdminByCMUAccount(cmuAccount: string): Promise<boolean> {
	// check if user is exits
	const user = await dbcontext.query.users.findFirst({
		where: eq(users.cmuaccount, cmuAccount),
	});
	
	if (!user) {
		return false;
	}
	// Query the user_roles table to check if the user has roleId = 1
	const role = await dbcontext
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userid, user.id), eq(userRoles.roleid, 5))).then((data) => data?.length > 0);

	return role;
	
}
/**
 * Check if a user has a specific permission.
 * @param userId The ID of the user to check permissions for.
 * @returns True if the user has the required role, otherwise false.
 */
export async function checkIsAdminByUserId(userId: string): Promise<boolean> {
export async function checkIsAdminByUserId(userId: string): Promise<boolean> {
	// Query the user_roles table to check if the user has roleId = 1
	const role = await dbcontext
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userid, userId), eq(userRoles.roleid, 1))).then((data) => data?.length > 0);

	return role;
}

export async function checkIsAdminByCMUAccount(cmuAccount: string): Promise<boolean> {
		.where(and(eq(userRoles.userid, userId), eq(userRoles.roleid, 1))).then((data) => data?.length > 0);

	return role;
}

export async function checkIsAdminByCMUAccount(cmuAccount: string): Promise<boolean> {
	// check if user is exits
	const user = await dbcontext.query.users.findFirst({
		where: eq(users.cmuaccount, cmuAccount),
	});
	
	
	if (!user) {
		return false;
	}
	// Query the user_roles table to check if the user has roleId = 1
	const role = await dbcontext
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userid, user.id), eq(userRoles.roleid, 1))).then((data) => data?.length > 0);

	return role;
	
}



/**
 * Create a new permission for a user.
 * @param userAccount The ID of the user to create the permission for.
 * @param programId The ID of the program to create the permission for.
 * @param roleId The ID of the role to create the permission for.
 * @returns True if the permission is created successfully or already have that role, otherwise false.
 */
export async function createUserRole(
	userAccount: string,
	programId: number,
	roleId: number
): Promise<boolean> {
	try {
		// Find the user in the users table
		const user = await dbcontext.query.users.findFirst({
			where: eq(users.cmuaccount, userAccount),
		});
		if (!user) {
			return false;
		}

		// Check if the user already has the specified role for the given program
		const existingRole = await dbcontext.query.userRoles.findFirst({
			where: and(
				eq(userRoles.userid, user.id),
				eq(userRoles.roleid, roleId),
				eq(userRoles, programId)
			),
		});

		// If the role already exists, return true
		if (existingRole) {
			return true;
		}

		// Insert a new role for the user
		const newPermission = await dbcontext
			.insert(userRoles)
			.values({
				userid: user.id,
				roleid: roleId,
				programid: programId,
			})
			.returning();

		// Return true if the permission is created successfully
		return newPermission.length > 0;
	} catch (error) {
		// Log the error and return false
		console.error('Error creating user role:', error);
		return false;
	}
}

