import Elysia, { t } from "elysia";
import { checkUserPermissions } from "../services/permission";

export const permissionController = (app: Elysia) => {
	app.post(
		"/api/getPermissions",
		async (context) => {
			const { userId } = context.body;

			// Use the service to check permissions
			const permissionResponse = await checkUserPermissions(userId);

			// Return the response to the client
			return permissionResponse;
		},
		{
			body: t.Object({
				userId: t.String(), // Validate input
			}),
		}
	);
};
