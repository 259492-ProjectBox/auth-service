import { Elysia } from "elysia";
import { authController } from "./auth";
import { formController } from "./form";
import { permissionController } from "./permission";
import { roleController } from "./role";

export const routes = (app: Elysia) => {
	authController(app);
	// formController(app);
	permissionController(app);
	roleController(app);
};
