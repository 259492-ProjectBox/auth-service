import { Elysia } from "elysia";
import { authRoutes } from "./auth";
import { formRoutes } from "./form";

export const routes = (app: Elysia) => {
	authRoutes(app);
	formRoutes(app);
};
