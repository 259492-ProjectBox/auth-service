import { getPermissionsFromUserID } from "../repositories/permission";

interface PermissionResponse {
	ok: boolean;
	message: string;
}

export async function checkUserPermissionFromUserID(
	userId: string
): Promise<PermissionResponse> {
	const hasPermission = await getPermissionsFromUserID(userId);

	return {
		ok: hasPermission,
		message: hasPermission
			? "Permission granted"
			: "User does not have permission",
	};
}

export async function checkUserPermissionFromUserAccount(cmuAccount:string): Promise<PermissionResponse> {
	const hasPermission = await getPermissionsFromUserID(cmuAccount);
	return {
		ok: hasPermission,
		message: hasPermission
			? "Permission granted"
			: "User does not have permission",
	}
}
export async function createAdmin(
	userId: string,
	permission: string
): Promise<PermissionResponse> {
	// Create permission

	return { ok: true, message: "Permission created" };
}
