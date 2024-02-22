import { initializeDatabase, pool } from "../src/db";
import { truncateTables } from "./helpers/testHelpers";

const tablesToTruncate = ["categories"];

// Truncate the tables before each test
beforeEach(async () => {
  await truncateTables(tablesToTruncate);
});

beforeAll(async () => {
  await initializeDatabase(); // Ensure the database is ready before tests
});

afterAll(async () => {
  await pool.end(); // Close the server after tests
}, 10000);
