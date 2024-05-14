import "dotenv/config";
import type { Config } from "drizzle-kit";

console.log(process.env.PG_HOST);

const host = process.env.PG_HOST;

if (!host) {
    throw new Error("PG_HOST is required");
}

const database = process.env.PG_DATABASE;

if (!database) {
    throw new Error("PG_DATABASE is required");
}

export default {
	schema: "./src/db/schema.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
        host,
        user: process.env.PG_USER,
        password:  process.env.PG_PASSWORD,
        database,
		ssl: false,
	},
} satisfies Config;
