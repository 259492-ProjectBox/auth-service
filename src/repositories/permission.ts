import { prisma } from "../../utils/prisma";

export async function getPermissions(userId: string): Promise<boolean> {
	// Use prisma to get user roles
	const roles = await prisma.userRole.findFirst({
		where: { userId: userId, roleId: 1 }, // Check if user has roleId = 1
	});

	if (!roles) {
		return false;
	}
	// Return true if the user has the required role, otherwise false
	return true;
}

export async function createPermission(
	adminId: string,
	userId: string
): Promise<boolean> {
	// Check if the user have admin permission
	const hasPermission = await getPermissions(adminId);
	if (!hasPermission) {
		return false;
	}
	//Check if the user already has the permission
	const userRole = await prisma.userRole.findFirst({
		where: { userId: userId, roleId: 1 },
	});
	if (userRole) {
		return true;
	}
	// Create permission
	const newPermission = await prisma.userRole.create({
		data: {
			userId: userId,
			roleId: 1,
		},
	});

	// Return true if the permission is created, otherwise false
	return !!newPermission;
}
