import { Elysia, t } from "elysia";
import { signIn } from "../services/auth";

export const authController = (app: Elysia) => {
	app.post("/api/signin", (context) => signIn(context), {
		body: t.Object({
			authorizationCode: t.String(),
		}),
	});
};
