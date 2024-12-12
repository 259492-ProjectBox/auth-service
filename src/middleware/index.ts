import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { jwtMiddleware } from "./jwt";
import { corsMiddleware } from "./cors";

export const middleware = (app: Elysia) => {
	app.use(swagger());
	app.use(corsMiddleware);
	app.use(jwtMiddleware);
};
