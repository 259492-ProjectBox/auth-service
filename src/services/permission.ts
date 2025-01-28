import {  checkIsAdminByUserId, checkIsPlatformAdminByCMUAccount, getProgramIdOfUser } from "../repositories/permission";
import { getUserIDByCMUAccount } from "../repositories/users";

interface PermissionResponse {
	ok: boolean;
	message: string;
}

export async function checkIsAdmin(
	userId: string
): Promise<PermissionResponse> {
	const hasPermission = await checkIsAdminByUserId(userId);

	return {
		ok: hasPermission,
		message: hasPermission
			? "Permission granted"
			: "User does not have permission",
	};
}

// get program from getProgramIdOfUser using cmu account
export const getProgramIdOfAdminFromCmuaccount = async (cmuAccount: string) :Promise<number[] | null> => {
	const userId = await getUserIDByCMUAccount(cmuAccount);
	const programIds = await getProgramIdOfUser(userId);
	return programIds.map(program => program.programId).filter(id => id !== null) as number[];
};

/**
 * Create a new permission for a user.
 * @param userId The ID of the user to create the permission for.
 * @param adminAccount The adminAccount of the user to create the permission for.
 * @param programId The ID of the program to create the permission for.
 * @returns True if the permission is created successfully or already have that role, otherwise false.
 */
export async function createAdmin(
	userId: string,
	adminAccount: string,
	programId: number,
): Promise<PermissionResponse> {
	
	const isAdmin = await checkIsPlatformAdminByCMUAccount(adminAccount);
	if (!isAdmin) {
		return {
			ok: false,
			message: "User does not have permission to create admin (Not platform admin)",
		}
	}

	// const newAdmin = await createUserRole(userId, programId, 1);
	// if (newAdmin) {
	// 	return {
	// 		ok: true,
	// 		message: "Admin created successfully",
	// 	}
	// }
	return {
		ok: false,
		message: "Admin already exists",
	}
	
}
