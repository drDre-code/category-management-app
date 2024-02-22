import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  parent_id: Joi.number().integer().allow(null),
});

const updateParentCategorySchema = Joi.object({
  new_parent_id: Joi.number().integer().required(),
});

const paramsSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export function CreateCategoryValidation(req: Request, res: Response, next: NextFunction) {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

export function CategoryParamsValidation(req: Request, res: Response, next: NextFunction) {
  const { error } = paramsSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

export function UpdateParentCategoryValidation(req: Request, res: Response, next: NextFunction) {
  const { error } = updateParentCategorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
