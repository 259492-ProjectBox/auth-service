import { Elysia } from "elysia";
import { routes } from "./controllers";
import { middleware } from "./middleware";

const app = new Elysia();

// Apply middleware
middleware(app);

// Register routes
routes(app);

app.get("/api/health", async () => {
	return { ok: true };
});

// Start server
app.listen(3002, () => {
	console.log("Server running on http://localhost:3002");

	// Ensure drizzle closes when the app exits
});
