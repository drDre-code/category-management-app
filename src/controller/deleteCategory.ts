import { Request, Response } from "express";
import { pool } from "../db";
import logger from "../logger";
import { findCategoryById } from "../helper";

export const DeleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await findCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    return res.status(204).send();
  } catch (error) {
    logger.error("Failed to remove the category", error);
    return res.status(500).json({ message: "Error removing the category" });
  }
};
