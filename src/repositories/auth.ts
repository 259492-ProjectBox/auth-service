import axios from "axios";
import { CmuOAuthBasicInfo } from "../../types/CmuOAuthBasicInfo";
// import { prisma } from "../../utils/prisma";
// import { AccountType } from "@prisma/client";

import { dbcontext } from "../../utils/drizzle";
import {
	accounttype,
	roles,
	userRoles,
	users,
} from "../../drizzle/migrations/schema";
import { eq, sql } from "drizzle-orm";

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
	const existingUser = await dbcontext
		.select()
		.from(users)
		.where(eq(users.cmuaccount, cmuBasicInfo.cmuitaccount))
		.limit(1);

	if (existingUser.length > 0) {
		const user = existingUser[0];
		await dbcontext
			.update(users)
			.set({
				cmuaccountname: cmuBasicInfo.cmuitaccount_name,
				studentid: cmuBasicInfo.student_id,
				prenameid: cmuBasicInfo.prename_id,
				prenameth: cmuBasicInfo.prename_TH,
				prenameen: cmuBasicInfo.prename_EN,
				firstnameth: cmuBasicInfo.firstname_TH,
				firstnameen: cmuBasicInfo.firstname_EN,
				lastnameth: cmuBasicInfo.lastname_TH,
				lastnameen: cmuBasicInfo.lastname_EN,
				organizationcode: cmuBasicInfo.organization_code,
				organizationnameth: cmuBasicInfo.organization_name_TH,
				organizationnameen: cmuBasicInfo.organization_name_EN,
				itAccounttype: cmuBasicInfo.itaccounttype_id,
				itAccounttypeth: cmuBasicInfo.itaccounttype_TH,
				itAccounttypeen: cmuBasicInfo.itaccounttype_EN,
				updatedat: new Date().toISOString(),
			})
			.where(eq(users.id, user.id));

		return user;
	} else {
		const [newUser] = await dbcontext
			.insert(users)
			.values({
				id: sql`uuid_generate_v4()`,
				cmuaccount: cmuBasicInfo.cmuitaccount,
				cmuaccountname: cmuBasicInfo.cmuitaccount_name,
				studentid: cmuBasicInfo.student_id,
				prenameid: cmuBasicInfo.prename_id,
				prenameth: cmuBasicInfo.prename_TH,
				prenameen: cmuBasicInfo.prename_EN,
				firstnameth: cmuBasicInfo.firstname_TH,
				firstnameen: cmuBasicInfo.firstname_EN,
				lastnameth: cmuBasicInfo.lastname_TH,
				lastnameen: cmuBasicInfo.lastname_EN,
				organizationcode: cmuBasicInfo.organization_code,
				organizationnameth: cmuBasicInfo.organization_name_TH,
				organizationnameen: cmuBasicInfo.organization_name_EN,
				itAccounttype: cmuBasicInfo.itaccounttype_id,
				itAccounttypeth: cmuBasicInfo.itaccounttype_TH,
				itAccounttypeen: cmuBasicInfo.itaccounttype_EN,
				createdat: new Date().toISOString(),
				updatedat: new Date().toISOString(),
			})
			.returning();

		const rolesList = await dbcontext.select().from(roles);

		if (cmuBasicInfo.itaccounttype_id === "StdAcc") {
			const studentRole = rolesList.find((role) => role.name === "student");
			if (studentRole) {
				await dbcontext.insert(userRoles).values({
					userid: newUser.id,
					roleid: studentRole.id,
				});
			}
		} else if (cmuBasicInfo.itaccounttype_id === "MISEmpAcc") {
			const misRole = rolesList.find((role) => role.name === "mis_employee");
			if (misRole) {
				await dbcontext.insert(userRoles).values({
					userid: newUser.id,
					roleid: misRole.id,
				});
			}
		} else if (cmuBasicInfo.itaccounttype_id === "AlumAcc") {
			const alumniRole = rolesList.find((role) => role.name === "alumni");
			if (alumniRole) {
				await dbcontext.insert(userRoles).values({
					userid: newUser.id,
					roleid: alumniRole.id,
				});
			}
		}

		return newUser;
	}
}
