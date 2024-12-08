import { prisma } from "../../utils/prisma";

export async function getPermissions(userId: string): Promise<boolean> {
	// Use prisma to get user roles
	const roles = await prisma.userRole.findMany({
		where: { userId: userId, roleId: 1 }, // Check if user has roleId = 1
	});

	// Return true if the user has the required role, otherwise false
	return roles.length > 0;
}
