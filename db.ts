import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const configs: postgres.Options<{}> = {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password:  process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: 'require',
 };


const migrationClient = postgres({ ...configs, max: 1 });

const queryClient = postgres(configs);

export const db = drizzle(queryClient);

