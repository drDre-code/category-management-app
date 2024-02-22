import { Request, Response } from "express";
import { pool } from "../db";
import logger from "../logger";
import { findCategoryById } from "../helper";

export const UpdateParentCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { new_parent_id } = req.body;
  try {
    const category = await findCategoryById(id);
    const newParentCategory = await findCategoryById(new_parent_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (!newParentCategory) {
      return res.status(404).json({ message: "New parent category not found" });
    }

    await pool.query("UPDATE categories SET parent_id = $1 WHERE id = $2", [new_parent_id, id]);
    return res.status(200).json({ message: "Subtree moved successfully" });
  } catch (error) {
    logger.error("Failed to move the subtree", error);
    return res.status(500).json({ message: "Error moving the subtree" });
  }
};
