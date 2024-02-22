import { pool } from "../../src/db"; // Adjust the import path to your actual pool configuration

export async function insertTestCategory({
  name,
  parent_id = null,
}: {
  name: string;
  parent_id?: number | null;
}) {
  const { rows } = await pool.query(
    "INSERT INTO categories (name, parent_id) VALUES ($1, $2) RETURNING *",
    [name, parent_id]
  );
  return rows[0];
}

export async function truncateTables(tables: string[]) {
  for (const table of tables) {
    await pool.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`);
  }
}