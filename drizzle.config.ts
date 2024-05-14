import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
	schema: "./src/db/schema.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		host: "192.168.1.6",
		user: "hello-fresh-user",
		password: "hello-fresh-password",
		database: "hello-fresh",
		ssl: true,
	},
} satisfies Config;
