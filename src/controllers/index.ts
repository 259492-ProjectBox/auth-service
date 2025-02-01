import { Elysia, t } from "elysia";
import { authController } from "./auth";
import { permissionController } from "./permission";
import { roleController } from "./role";
import { programController } from "./program";
import { getProgramIdOfAdminFromCmuaccount } from "../services/permission";
import { getRoleOfUser } from "../repositories/permission";
import { userController } from "./user";

export const routes = (app: Elysia) => {
	authController(app);
	permissionController(app);
	roleController(app);
	programController(app);
	userController(app);
	//getProgramIdOfAdminFromCmuaccount
	app.get(
		"/api/getProgramIdOfAdminFromCmuaccount/:cmuAccount",
		async (context) => {
			const { cmuAccount } = context.params;
			const programId = await getProgramIdOfAdminFromCmuaccount(cmuAccount);
			return programId;
		},
		{
			params: t.Object({
				cmuAccount: t.String(),
			}),
			
		}
	);
	//getRoleOfUser
	app.get(
		"/api/getRoleOfUser/:userId",
		async (context) => {
			const { userId } = context.params;
			
			// Use the service to create admin
			const permissionResponse = await getRoleOfUser(userId);

			// Return the response to the client
			return permissionResponse;
		},
		{
			params: t.Object({
				userId: t.String(), // Validate input
			}),
		}
	)
};
