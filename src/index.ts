import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { signIn } from "./signIn";

const authenticate = async (context: any) => {
	const { jwt, cookie, set } = context;
	// Direct access to cookie value
	const { exampleToken } = cookie;

	const token = exampleToken.value;
	if (typeof token !== "string") {
		set.status = 401;
		return { ok: false, message: "Invalid token" } as ErrorResponse;
	}

	try {
		const decoded = await jwt.verify(token);
		if (!decoded) throw new Error("Invalid token");

		return {
			ok: true,
			cmuAccount: decoded.cmuAccount,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			studentId: decoded.studentId,
		} as SuccessResponse;
	} catch (error) {
		set.status = 401;
		return { ok: false, message: "Invalid token" } as ErrorResponse;
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
	.get("/api/whoami", async (context): Promise<WhoAmIResponse> => {
		const response = await authenticate(context);
		return response;
	});
// .post("/api/signout", async (ctx: any) => {
// 	ctx.cookie["cmu-oauth-example-token"].set({
// 		value: "",
// 		maxAge: 0,
// 		path: "/",
// 		domain: "localhost",
// 	});

// 	return { ok: true };
// });

app.listen(4000);

console.log("🦊 Server is running at http://localhost:4000");
