import Elysia, { t } from "elysia";
import {  checkIsAdmin, createAdmin } from "../services/permission";
import { getRoleOfUser } from "../repositories/permission";

export const permissionController = (app: Elysia) => {
	
	app.get(
		"/api/checkIsAdminByUserID/:userId", // Define a parameterized route
		async (context) => {
			// Extract userId from the params
			const { userId } = context.params;
	
			// Use the service to check permissions
			const permissionResponse = await checkIsAdmin(userId);
	
			// Return the response to the client
			return permissionResponse;
		},
		{
			params: t.Object({
				userId: t.String(), // Validate userId in params
			}),
			detail:{
				tags: ["Permission"],
			}
		}
	);
	
	
	//create admin
	app.post(
		"/api/createAdmin",
		async (context) => {
			const { userAccount, adminAccount, programId } = context.body;
			
			// Use the service to create admin
			const permissionResponse = await createAdmin(userAccount, adminAccount, programId);

			// Return the response to the client
			return permissionResponse;
		},
		{
			body: t.Object({
				userAccount: t.String(), // Validate input
				adminAccount: t.String(), // Validate input
				programId: t.Number(), // Validate input
			}),

			detail:{
				tags: ["Admin"],
			}
		}
	)

	
	
};
