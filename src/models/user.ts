import { drizzle } from 'drizzle-orm';
import { Pool } from 'pg';

const pool = new Pool({
  user: Deno.env.get('DB_USER'),
  host: Deno.env.get('DB_HOST'),
  database: Deno.env.get('DB_NAME'),
  password: Deno.env.get('DB_PASSWORD'),
  port: parseInt(Deno.env.get('DB_PORT') || '5432'),
});

const db = drizzle(pool);

export { db };
