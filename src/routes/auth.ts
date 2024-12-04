import { Elysia, t } from "elysia";
import { signIn } from "../controllers/auth";

export const authRoutes = (app: Elysia) => {
	app.post("/api/signin", (context) => signIn(context), {
		body: t.Object({
			authorizationCode: t.String(),
		}),
	});
};
