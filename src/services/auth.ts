import { JWTPayload } from "../../types/JWTPayload";
import {
	getCMUBasicInfoAsync,
	getEmtraIDAccessTokenAsync,
	
	saveOrUpdateUser,
} from "../repositories/auth";
import {  checkIsPlatformAdminByCMUAccount, getRoleOfUser } from "../repositories/permission";
import { getProgramIdOfAdminFromCmuaccount } from "./permission";

export const signIn = async ({ body, set, jwt }: any) => {
	const { authorizationCode } = body;

	if (typeof authorizationCode !== "string") {
		set.status = 400;
		return { ok: false, message: "Invalid authorization code" };
	}

	
	
	const accessToken = await getEmtraIDAccessTokenAsync(authorizationCode);
	
	if (!accessToken) {
		set.status = 400;
		return { ok: false, message: "Cannot get Entra access token" };
	}

	const cmuBasicInfo = await getCMUBasicInfoAsync(accessToken);
	if (!cmuBasicInfo) {
		set.status = 400;
		return { ok: false, message: "Cannot get CMU basic info" };
	}

	
	
	const user = await saveOrUpdateUser(cmuBasicInfo);

	// const isAdmin = await checkIsPlatformAdminByCMUAccount(user.cmuaccount);
	const roles = await getRoleOfUser(user.id);
	const isPlatformAdmin = await checkIsPlatformAdminByCMUAccount(user.id);
	const isAdmin = await getProgramIdOfAdminFromCmuaccount(user.cmuaccount);
	const payload: JWTPayload = {
		cmuAccount: user.cmuaccount,
		firstName: user.firstnameen,
		lastName: user.lastnameen,
		studentId: user.studentid ?? undefined,
		roles: roles.map((role) => role.roleName),
		isPlatformAdmin: isPlatformAdmin,
		isAdmin: isAdmin?.map((admin) => admin) ?? [],

	};

	const token = await jwt.sign(payload);

	if (!token) {
		set.status = 500;
		return { ok: false, message: "Failed to generate JWT token" };
	}

	return { ok: true, accessToken: token };
};
