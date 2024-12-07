import { drizzle } from "drizzle-orm/postgres-js";
import { dbCreds } from "../../drizzle.config";
import * as schema from "./schema";
import postgres from "postgres";

console.debug(dbCreds);

export const client = postgres(dbCreds);
export const db = drizzle(client, { schema });
