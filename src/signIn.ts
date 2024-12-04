import axios from "axios";
import { CmuOAuthBasicInfo } from "../types/CmuOAuthBasicInfo";
import { JWTPayload } from "../types/JWTPayload";
import { prisma } from "../utils/prisma";

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

	const cmuBasicInfo = await getCMUBasicInfo(accessToken);
	if (!cmuBasicInfo) {
		set.status = 400;
		return { ok: false, message: "Cannot get CMU basic info" };
	}

	const user = await saveOrUpdateUser(cmuBasicInfo);

	const payload: JWTPayload = {
		cmuAccount: cmuBasicInfo.cmuitaccount,
		firstName: cmuBasicInfo.firstname_EN,
		lastName: cmuBasicInfo.lastname_EN,
		studentId: cmuBasicInfo.student_id,
	};

	const token = await jwt.sign(payload);
	if (!token) {
		set.status = 500;
		return { ok: false, message: "Failed to generate JWT token" };
	}

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
		console.error("Error getting access token:", err);
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
		console.error("Error getting CMU basic info:", err);
		return null;
	}
}

async function saveOrUpdateUser(cmuBasicInfo: CmuOAuthBasicInfo) {
	const existingUser = await prisma.user.findUnique({
		where: { cmuAccount: cmuBasicInfo.cmuitaccount },
	});

	if (existingUser) {
		// อัปเดตข้อมูลผู้ใช้ที่มีอยู่แล้ว
		return await prisma.user.update({
			where: { cmuAccount: cmuBasicInfo.cmuitaccount },
			data: {
				cmuAccountName: cmuBasicInfo.cmuitaccount_name,
				studentId: cmuBasicInfo.student_id,
				prenameId: cmuBasicInfo.prename_id,
				prenameTH: cmuBasicInfo.prename_TH,
				prenameEN: cmuBasicInfo.prename_EN,
				firstNameTH: cmuBasicInfo.firstname_TH,
				firstNameEN: cmuBasicInfo.firstname_EN,
				lastNameTH: cmuBasicInfo.lastname_TH,
				lastNameEN: cmuBasicInfo.lastname_EN,
				organizationCode: cmuBasicInfo.organization_code,
				organizationNameTH: cmuBasicInfo.organization_name_TH,
				organizationNameEN: cmuBasicInfo.organization_name_EN,
				it_accountType: cmuBasicInfo.itaccounttype_id,
				it_accountTypeTH: cmuBasicInfo.itaccounttype_TH,
				it_accountTypeEN: cmuBasicInfo.itaccounttype_EN,
			},
		});
	} else {
		// สร้างผู้ใช้ใหม่
		return await prisma.user.create({
			data: {
				cmuAccount: cmuBasicInfo.cmuitaccount,
				cmuAccountName: cmuBasicInfo.cmuitaccount_name,
				studentId: cmuBasicInfo.student_id,
				prenameId: cmuBasicInfo.prename_id,
				prenameTH: cmuBasicInfo.prename_TH,
				prenameEN: cmuBasicInfo.prename_EN,
				firstNameTH: cmuBasicInfo.firstname_TH,
				firstNameEN: cmuBasicInfo.firstname_EN,
				lastNameTH: cmuBasicInfo.lastname_TH,
				lastNameEN: cmuBasicInfo.lastname_EN,
				organizationCode: cmuBasicInfo.organization_code,
				organizationNameTH: cmuBasicInfo.organization_name_TH,
				organizationNameEN: cmuBasicInfo.organization_name_EN,
				it_accountType: cmuBasicInfo.itaccounttype_id,
				it_accountTypeTH: cmuBasicInfo.itaccounttype_TH,
				it_accountTypeEN: cmuBasicInfo.itaccounttype_EN,
			},
		});
	}
}

function getRoleByAccountType(accountType: string): string {
	switch (accountType) {
		case "StdAcc":
			return "student";
		case "AlumAcc":
			return "alumni";
		case "MISEmpAcc":
			return "employee";
		default:
			return "guest";
	}
}
