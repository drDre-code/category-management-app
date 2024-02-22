import { initializeDatabase } from "./db";
import app from "./app";
import logger from "./logger";

// Create an instance of express

const port = 3000; // Port number for the Express server

// Initialize the database schema before starting the server
initializeDatabase().then(() => {
  logger.log("info", "Connected to the database successfully");
  app.listen(port, () => {
    logger.log("info", `Server running on port ${port}`);
  });
});
