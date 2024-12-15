// create controller for get all role

import Elysia from "elysia";
import { getAllRoles } from "../repositories/role";

export async function roleController(app: Elysia) {
	app.get("/api/roles", async () => {
		const roles = await getAllRoles();
		return roles;
	});
}
