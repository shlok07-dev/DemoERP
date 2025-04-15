import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import dotenv from "dotenv";
dotenv.config();

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5433/mydb",
});

// Create the Drizzle client
export const db = drizzle(pool, { schema });
