import { Request, Response } from "express";
import { pool } from "../db";
import logger from "../logger";

export const GetTopCategories = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories WHERE parent_id IS NULL",
    );
    return res.json(result.rows);
  } catch (error) {
    logger.error("Failed to fetch top-level categories", error);
    return res
      .status(500)
      .json({ message: "Error fetching top-level categories" });
  }
};
