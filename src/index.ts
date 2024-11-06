import { Context, Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { signIn } from "./signIn";

const authenticate = async ({
	jwt,
	cookies: { "cmu-oauth-example-token": token },
	set,
}: any) => {
	if (!token) {
		set.status = 401;
		return { ok: false, message: "Invalid token" };
	}

	try {
		const decoded = await jwt.verify(token);
		if (!decoded) throw new Error("Invalid token");
		return decoded;
	} catch (error) {
		set.status = 401;
		return { ok: false, message: "Invalid token" };
	}
};

const app = new Elysia()
	.use(swagger())
	.use(cors())
	.use(
		jwt({
			name: "jwt",
			secret: process.env.JWT_SECRET!,
			exp: "1h",
		})
	)
	.post(
		"/api/signin",
		// Pass the entire context to signIn
		(context) => signIn(context),
		{
			body: t.Object({
				authorizationCode: t.String(),
			}),
		}
	)
	// Rest of your routes remain the same
	.get("/api/whoami", async (context: any) => {
		const decoded = await authenticate(context);

		if ("message" in decoded) {
			return decoded;
		}

		return {
			ok: true,
			cmuAccount: decoded.cmuAccount,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			studentId: decoded.studentId,
		};
	})
	.post("/api/signout", async (ctx: any) => {
		ctx.cookie["cmu-oauth-example-token"].set({
			value: "",
			maxAge: 0,
			path: "/",
			domain: "localhost",
		});

		return { ok: true };
	});

app.listen(4000);

console.log("🦊 Server is running at http://localhost:4000");
