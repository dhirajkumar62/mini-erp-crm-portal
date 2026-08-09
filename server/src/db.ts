const pg = require('pg') as {
  Pool: new (options: unknown) => { query: (text: string) => Promise<unknown> };
};

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required. Add your Neon PostgreSQL connection string to server/.env.');
}

export const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
  max: 5,
});

export async function checkDatabaseConnection() {
  await pool.query('SELECT 1');
}
