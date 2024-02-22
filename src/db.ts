import { Pool } from "pg";
import logger from "./logger";

// Setup database connection
export const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

// Function to initialize the database schema
export const initializeDatabase = async () => {
  try {
    const createTableText = `
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        parent_id INTEGER,
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE
      );
    `;

    await pool.query(createTableText);
    logger.log("info", "Categories table is ready");
  } catch (error) {
    logger.error(
      "Failed to connect to the database or create the table",
      error,
    );
    if (process.env.NODE_ENV !== "test") {
      process.exit(1); // Exit the application if we can't connect to the database or create the table
    }
  }
};
