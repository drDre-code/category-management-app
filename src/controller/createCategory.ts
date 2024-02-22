import { Request, Response } from "express";
import { pool } from "../db";
import logger from "../logger";
import { findCategoryById } from "../helper";

export const CreateCategory = async (req: Request, res: Response) => {
  const { name, parent_id } = req.body;
  try {
    if (parent_id) {
      const parentCategory = await findCategoryById(parent_id);
      if (!parentCategory) {
        return res.status(404).json({ message: "Parent category not found" });
      }
    }

    const result = await pool.query(
      "INSERT INTO categories(name, parent_id) VALUES($1, $2) RETURNING *",
      [name, parent_id],
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error("Failed to add a new category", error);
    return res.status(500).json({ message: "Error adding a new category" });
  }
};
