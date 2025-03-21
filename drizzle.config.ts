import type { Config } from "drizzle-kit";

const config: Config = {
	dialect: "postgresql", // Database dialect
	schema: "./drizzle/migrations/*.ts", // Path to your Drizzle schema file
	out: "./drizzle/migrations", // Where migration files will be saved
	dbCredentials: { url: process.env.DATABASE_URL || "" },
};

export default config;
