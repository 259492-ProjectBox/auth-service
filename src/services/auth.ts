import { JWTPayload } from "../../types/JWTPayload";
import {
	getCMUBasicInfo,
	getOAuthAccessToken,
	saveOrUpdateUser,
} from "../repositories/auth";
import { checkIsAdminByCMUAccount } from "../repositories/permission";

export const signIn = async ({ body, set, jwt }: any) => {
	const { authorizationCode } = body;

	if (typeof authorizationCode !== "string") {
		set.status = 400;
		return { ok: false, message: "Invalid authorization code" };
	}

	
	const accessToken = await getOAuthAccessToken(authorizationCode);
	
	if (!accessToken) {
		set.status = 400;
		return { ok: false, message: "Cannot get OAuth access token" };
	}

	const cmuBasicInfo = await getCMUBasicInfo(accessToken);
	if (!cmuBasicInfo) {
		set.status = 400;
		return { ok: false, message: "Cannot get CMU basic info" };
	}

	
	const user = await saveOrUpdateUser(cmuBasicInfo);

	const isAdmin = await checkIsAdminByCMUAccount(user.cmuaccount);
	const payload: JWTPayload = {
		cmuAccount: user.cmuaccount,
		firstName: user.firstnameen,
		lastName: user.lastnameen,
		studentId: user.studentid ?? undefined,
		orgName: user.organizationnameen ?? undefined,
		isAdmin :isAdmin,
	};

	const token = await jwt.sign(payload);

	if (!token) {
		set.status = 500;
		return { ok: false, message: "Failed to generate JWT token" };
	}

	return { ok: true, accessToken: token };
};
