import Elysia, { t } from "elysia";
import { checkUserPermissionFromUserAccount, checkUserPermissionFromUserID, createAdmin } from "../services/permission";

export const permissionController = (app: Elysia) => {
	// app.post(
	// 	"/api/getPermission",
	// 	async (context) => {
	// 		const { userId } = context.body;

	// 		// Use the service to check permissions
	// 		const permissionResponse = await checkUserPermissionFromUserID(userId);

	// 		// Return the response to the client
	// 		return permissionResponse;
	// 	},
	// 	{
	// 		body: t.Object({
	// 			userId: t.String(), // Validate input
	// 		}),
	// 	}
	// );
	app.get(
		"/api/checkIsAdminByUserID/:userId", // Define a parameterized route
		async (context) => {
			// Extract userId from the params
			const { userId } = context.params;
	
			// Use the service to check permissions
			const permissionResponse = await checkUserPermissionFromUserID(userId);
	
			// Return the response to the client
			return permissionResponse;
		},
		{
			params: t.Object({
				userId: t.String(), // Validate userId in params
			}),
		}
	);
	
	app.post(
		"/api/checkIsAdminByCMUAccount",
		async (context) => {
			const { cmuAccount } = context.body;
			
			// Use the service to check permissions
			const permissionResponse = await checkUserPermissionFromUserAccount(cmuAccount);

			// Return the response to the client
			return permissionResponse;
		},
		{
			body: t.Object({
				cmuAccount: t.String(), // Validate input
			}),
		}
	)
	//create admin
	app.post(
		"/api/createAdmin",
		async (context) => {
			const { userId, adminAccount, programId } = context.body;
			
			// Use the service to create admin
			const permissionResponse = await createAdmin(userId, adminAccount, programId);

			// Return the response to the client
			return permissionResponse;
		},
		{
			body: t.Object({
				userId: t.String(), // Validate input
				adminAccount: t.String(), // Validate input
				programId: t.Number(), // Validate input
			}),
		}
	)

};
