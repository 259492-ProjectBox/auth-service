// create basic get all role

import { roles } from "../../drizzle/migrations/schema";
import { dbcontext } from "../../utils/drizzle";

export async function getAllRoles() {
	const allRoles = await dbcontext.select().from(roles);
	return allRoles;
}
