import { Context, Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { signIn } from "./signIn";

const setOAuthCookie = (ctx: any) => {
	ctx.cookies["cmu-oauth-example-token"] = {
		value: ctx.cookies["cmu-oauth-example-token"],
		options: {
			maxAge: 3600,
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
			domain: "localhost",
		},
	};
};

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
	// .use(setOAuthCookie) // Attach custom middleware for setting cookie
	.post("/api/signin", signIn)
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
		ctx.cookies["cmu-oauth-example-token"] = {
			value: "",
			options: {
				maxAge: 0,
				path: "/",
				domain: "localhost",
			},
		};

		return { ok: true };
	});

app.listen(3000);

console.log("🦊 Server is running at http://localhost:3000");
