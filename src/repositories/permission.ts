import { dbcontext } from "../../utils/drizzle";
import { eq, and } from "drizzle-orm";
import { userRoles } from "../../drizzle/migrations/schema";

/**
 * Check if a user has a specific permission.
 * @param userId The ID of the user to check permissions for.
 * @returns True if the user has the required role, otherwise false.
 */
export async function getPermissions(userId: string): Promise<boolean> {
	// Query the user_roles table to check if the user has roleId = 1
	const role = await dbcontext
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userid, userId), eq(userRoles.roleid, 1)));
	// .first();

	// Return true if a role is found, otherwise false
	return !!role;
}

/**
 * Create a permission for a user if the admin has the required permissions.
 * @param adminId The ID of the admin user trying to assign the permission.
 * @param userId The ID of the user to assign the permission to.
 * @returns True if the permission is created or already exists, otherwise false.
 */
export async function createPermission(
	adminId: string,
	userId: string
): Promise<boolean> {
	// Check if the admin has the required permissions
	const hasPermission = await getPermissions(adminId);
	if (!hasPermission) {
		return false;
	}

	// Check if the user already has the role
	// const existingRole = await dbcontext
	// 	.select()
	// 	.from(userRoles)
	// 	.where(and(eq(userRoles.userid, userId), eq(userRoles.roleid, 1)));

	const existingRole = await dbcontext.query.userRoles.findFirst({
		where: and(
			eq(userRoles.userid, userId), // userRoles.userid should be used here
			eq(userRoles.roleid, 1) // userRoles.roleid should be used here
		),
	});

	if (existingRole != null) {
		return true;
	}

	// Insert a new role for the user
	const newPermission = await dbcontext
		.insert(userRoles)
		.values({
			userid: userId,
			roleid: 1,
		})
		.returning();

	// Return true if the permission is created successfully
	return newPermission.length > 0;
}
