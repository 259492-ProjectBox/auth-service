import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import Elysia from "elysia";

export const middleware = (app: Elysia) => {
	app.use(swagger());
	app.use(cors());
};
