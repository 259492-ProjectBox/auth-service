import Elysia, { t } from "elysia";
import { checkUserPermissionFromUserAccount, checkUserPermissionFromUserID} from "../services/permission";

export const permissionController = (app: Elysia) => {
	app.post(
		"/api/getPermission",
		async (context) => {
			const { userId } = context.body;

			// Use the service to check permissions
			const permissionResponse = await checkUserPermissionFromUserID(userId);

			// Return the response to the client
			return permissionResponse;
		},
		{
			body: t.Object({
				userId: t.String(), // Validate input
			}),
		}
	);

	app.post(
		"/api/getPermissionByAccount",
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
};
