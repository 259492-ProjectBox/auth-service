import { getPermissions as getUserPermissions } from "../repositories/permission";

interface PermissionResponse {
	ok: boolean;
	message: string;
}

export async function checkUserPermissions(
	userId: string
): Promise<PermissionResponse> {
	const hasPermission = await getUserPermissions(userId);

	return {
		ok: hasPermission,
		message: hasPermission
			? "Permission granted"
			: "User does not have permission",
	};
}

export async function createAdmin(
	userId: string,
	permission: string
): Promise<PermissionResponse> {
	// Create permission

	return { ok: true, message: "Permission created" };
}
