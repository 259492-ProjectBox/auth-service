import { Elysia } from "elysia";
import { authController } from "./auth";
import { permissionController } from "./permission";
import { roleController } from "./role";
import { programController } from "./program";

export const routes = (app: Elysia) => {
	authController(app);
	permissionController(app);
	roleController(app);
	programController(app);
};
