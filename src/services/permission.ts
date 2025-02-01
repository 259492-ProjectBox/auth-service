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

export const checkIsAdminByEmail = async (email: string): Promise<PermissionResponse> => {
	const userId = await getUserIDByCMUAccount(email);
	return checkIsAdmin(userId);
}
// get program from getProgramIdOfUser using cmu account
export const getProgramIdOfAdminFromCmuaccount = async (cmuAccount: string) :Promise<number[] | null> => {
	const userId = await getUserIDByCMUAccount(cmuAccount);
	const programIds = await getProgramIdOfUser(userId);
	return programIds.map(program => program.programId).filter(id => id !== null) as number[];
};

