import axios from "axios";


import { dbcontext } from "../../utils/drizzle";
import {
	roles,
	userRoles,
	users,
} from "../../drizzle/migrations/schema";
import { eq, sql } from "drizzle-orm";
import { CmuEntraIDBasicInfo } from "../../types/CmuEntraIDBasicInfo";

export async function getEmtraIDAccessTokenAsync(
	authorizationCode: string
  ): Promise<string | null> {
	try {
	  const tokenUrl = process.env.CMU_ENTRAID_GET_TOKEN_URL as string;
	  const redirectUrl = process.env.CMU_ENTRAID_REDIRECT_URL as string;
	  const clientId = process.env.CMU_ENTRAID_CLIENT_ID as string;
	  const clientSecret = process.env.CMU_ENTRAID_CLIENT_SECRET as string;
	  const scope = process.env.SCOPE as string;
  
	  const response = await axios.post(
		tokenUrl,
		{
		  code: authorizationCode,
		  redirect_uri: redirectUrl,
		  client_id: clientId,
		  client_secret: clientSecret,
		  scope: scope,
		  grant_type: "authorization_code",
		},
		{
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		  }
		}
	  ); 
  
	  return response.data.access_token;    
	} catch (error) {
	  return null;
	}
  }

export async function getCMUBasicInfoAsync(accessToken: string) {
	try {
	  const besicinfoUrl = process.env.CMU_ENTRAID_GET_BASIC_INFO as string;
	  const response = await axios.get(
		besicinfoUrl,
		{
		  headers: { Authorization: "Bearer " + accessToken },
		}
	  );
	  return response.data as CmuEntraIDBasicInfo;
	} catch (err) {
	  return null;
	}
  }

export async function saveOrUpdateUser(cmuBasicInfo: CmuEntraIDBasicInfo) {
		const existingUser = await dbcontext.query.users.findFirst({
			where: eq(users.cmuaccount, cmuBasicInfo.cmuitaccount),
		});
		
	if (existingUser) {
		await dbcontext
			.update(users)
			.set({
				id: existingUser.id,
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
				updatedat: new Date().toISOString(),
				isactive: true,
			})
			.where(eq(users.id, existingUser.id));

		return existingUser;
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
