import { pool } from "./db";

export const findCategoryById = async (id: string) => {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
};
