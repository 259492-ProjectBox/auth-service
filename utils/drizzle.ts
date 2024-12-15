import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../drizzle/migrations/schema";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not defined");
}
const drizzleClient = postgres(process.env.DATABASE_URL);
export const dbcontext = drizzle({
	client: drizzleClient,
	schema: schema,
});
