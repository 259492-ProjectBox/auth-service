import { Elysia } from "elysia";
import { authController } from "./auth";
import { formController } from "./form";
import { permissionController } from "./permission";

export const routes = (app: Elysia) => {
	authController(app);
	// formController(app);
	permissionController(app);
};
