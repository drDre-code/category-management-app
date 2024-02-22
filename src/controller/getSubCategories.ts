import { Request, Response } from "express";
import { pool } from "../db";
import logger from "../logger";
import { findCategoryById } from "../helper";

export const GetSubCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await findCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    // This is a simple example. For a real-world scenario, you might need a recursive query to fetch all descendants.
    const result = await pool.query("SELECT * FROM categories WHERE parent_id = $1", [id]);
    return res.json(result.rows);
  } catch (error) {
    logger.error("Failed to fetch the subtree", error);
    return res.status(500).json({ message: "Error fetching the subtree" });
  }
};
