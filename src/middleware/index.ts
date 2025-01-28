import Elysia from "elysia";
import { jwtMiddleware } from "./jwt";
import { corsMiddleware } from "./cors";
import { swaggerConfig } from "./swagger";

export const middleware = (app: Elysia) => {
	app.use(swaggerConfig);
	app.use(corsMiddleware);
	app.use(jwtMiddleware);
};
