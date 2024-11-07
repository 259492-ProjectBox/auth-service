import axios from "axios";
import { CmuOAuthBasicInfo } from "../types/CmuOAuthBasicInfo";
import { JWTPayload } from "../types/JWTPayload";

export const signIn = async ({
	body,
	set,
	jwt,
	cookie,
}: {
	body: { authorizationCode: string };
	set: any;
	jwt: any;
	cookie: any;
}) => {
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

	// console.log("access ", accessToken);

	const cmuBasicInfo = await getCMUBasicInfo(accessToken);
	if (!cmuBasicInfo) {
		set.status = 400;
		return { ok: false, message: "Cannot get cmu basic info" };
	}

	const payload: JWTPayload = {
		cmuAccount: cmuBasicInfo.cmuitaccount,
		firstName: cmuBasicInfo.firstname_EN,
		lastName: cmuBasicInfo.lastname_EN,
		studentId: cmuBasicInfo.student_id,
	};

	const token = await jwt.sign(payload);

	return { ok: true, accessToken: token };
};
async function getOAuthAccessToken(
	authorizationCode: string
): Promise<string | null> {
	try {
		const response = await axios.post(
			process.env.CMU_OAUTH_GET_TOKEN_URL as string,
			{},
			{
				params: {
					code: authorizationCode,
					redirect_uri: process.env.CMU_OAUTH_REDIRECT_URL,
					client_id: process.env.CMU_OAUTH_CLIENT_ID,
					client_secret: process.env.CMU_OAUTH_CLIENT_SECRET,
					grant_type: "authorization_code",
				},
				headers: {
					"content-type": "application/x-www-form-urlencoded",
				},
			}
		);
		return response.data.access_token;
	} catch (err) {
		return null;
	}
}

async function getCMUBasicInfo(
	accessToken: string
): Promise<CmuOAuthBasicInfo | null> {
	try {
		const response = await axios.get(
			process.env.CMU_OAUTH_GET_BASIC_INFO as string,
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		);
		return response.data as CmuOAuthBasicInfo;
	} catch (err) {
		return null;
	}
}
