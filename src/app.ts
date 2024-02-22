import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import logger from "./logger";
import {
  GetSubCategories,
  DeleteCategory,
  CreateCategory,
  UpdateParentCategory,
  GetTopCategories,
} from "./controller";
import {
  CategoryParamsValidation,
  CreateCategoryValidation,
  UpdateParentCategoryValidation,
} from "./validation";

// Create an instance of express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
  // Log request details
  res.on("finish", () => {
    // Ensure you capture the status after response is sent
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`, {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      ip: req.ip,
    });
  });
  next();
});

// Swagger documentation
const swaggerDocumentPath = path.join(__dirname, "..", "API-docs.yaml");
const swaggerDocument = YAML.load(swaggerDocumentPath);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add a category
app.post("/categories", CreateCategoryValidation, CreateCategory);

// Remove a category
app.delete("/categories/:id", CategoryParamsValidation, DeleteCategory);

// Fetch top-level categories
app.get("/categories/top-level", GetTopCategories);

// Fetch a subtree
app.get("/categories/:id/subtree", CategoryParamsValidation, GetSubCategories);

// Move a subtree
app.patch(
  "/categories/:id/parent",
  CategoryParamsValidation,
  UpdateParentCategoryValidation,
  UpdateParentCategory,
);

export default app;
