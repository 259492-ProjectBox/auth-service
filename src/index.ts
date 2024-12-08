import { Elysia } from "elysia";
import { routes } from "./controllers";
import { middleware } from "./middleware";
import { prisma } from "../utils/prisma";
import { jwtMiddleware } from "./middleware/jwt";

const app = new Elysia();

// Apply middleware
middleware(app);

// Register routes
routes(app);

app.get("/api/health", async () => {
	return { ok: true };
});

// Start server
app.listen(5000, () => {
	console.log("Server running on http://localhost:5000");

	// Ensure Prisma closes when the app exits
	process.on("SIGINT", async () => {
		await prisma.$disconnect();
		console.log("Prisma client disconnected.");
		process.exit();
	});
});
