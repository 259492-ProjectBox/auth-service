import Elysia, { t } from "elysia";
import {  checkIsAdmin, checkIsAdminByEmail} from "../services/permission";
import { createAdmin } from "../services/user";

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
	
	
	//checkIsAdminByEmail
	app.get("/api/checkIsAdminByEmail/:email", async (context) => {
		const { email } = context.params;
		const permissionResponse = await checkIsAdminByEmail(email);
		return permissionResponse;
	},
	{
		params: t.Object({
			email: t.String(),
		}),
		detail: {
			tags: ["Permission"],
		}
	});

	
	
};
