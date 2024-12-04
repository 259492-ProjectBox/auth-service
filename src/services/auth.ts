import axios from "axios";
import { CmuOAuthBasicInfo } from "../../types/CmuOAuthBasicInfo";
import { prisma } from "../../utils/prisma";

export async function getOAuthAccessToken(authorizationCode: string) {
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
		console.error("Error getting access token:", err); // Log any errors
		return null;
	}
}

export async function getCMUBasicInfo(
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

export async function saveOrUpdateUser(cmuBasicInfo: CmuOAuthBasicInfo) {
	const existingUser = await prisma.user.findUnique({
		where: { cmuAccount: cmuBasicInfo.cmuitaccount },
	});

	if (existingUser) {
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
