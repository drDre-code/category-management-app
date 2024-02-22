import request from "supertest";
import app from "../../src/app";
import { insertTestCategory } from "../helpers/testHelpers";

describe("Category Endpoints", () => {
  it("should create a new category if parent_id is null", async () => {
    const res = await request(app).post("/categories").send({
      name: "Test Category",
      parent_id: null,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toEqual("Test Category");
  });

  it("should create a new category if parent_id is existing", async () => {
    const parentCategory = await insertTestCategory({ name: "Parent Category", parent_id: null });
    const res = await request(app).post("/categories").send({
      name: "Test Category",
      parent_id: parentCategory.id,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toEqual("Test Category");
  });

  it("should return 400 if name is invalid", async () => {
    const parentCategory = await insertTestCategory({ name: "Parent Category", parent_id: null });
    const res = await request(app).post("/categories").send({
      name: "",
      parent_id: parentCategory.id,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("should return 404 if parent category is not found", async () => {
    const res = await request(app).post("/categories").send({
      name: "Test Category",
      parent_id: 23,
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Parent category not found");
  });

  it("should fetch top-level categories", async () => {
    const parentCategory = await insertTestCategory({ name: "Parent Category", parent_id: null });
    await insertTestCategory({ name: "Child Category", parent_id: parentCategory.id });

    const res = await request(app).get("/categories/top-level");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].parent_id).toBeNull();
    expect(res.body[0].name).toEqual("Parent Category");
  });

  it("should remove a category", async () => {
    const testCategory = await insertTestCategory({ name: "Category to Remove", parent_id: null });
    const res = await request(app).delete(`/categories/${testCategory.id}`);

    expect(res.statusCode).toEqual(204);
  });

  it("should return 400 if id is invalid", async () => {
    const res = await request(app).delete(`/categories/string`);

    expect(res.statusCode).toEqual(400);
  });

  it("should return 404 if category does not exist", async () => {
    const res = await request(app).delete(`/categories/123`);

    expect(res.statusCode).toEqual(404);
  });

  it("should fetch a subtree of categories", async () => {
    const parentCategory = await insertTestCategory({ name: "Parent Category", parent_id: null });
    await insertTestCategory({ name: "Child Category", parent_id: parentCategory.id });

    const res = await request(app).get(`/categories/${parentCategory.id}/subtree`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].name).toEqual("Child Category");
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return 400 if category id is invalid", async () => {
    const res = await request(app).get(`/categories/invalid-string/subtree`);

    expect(res.statusCode).toEqual(400);
  });

  it("should return 404 if category does not exist", async () => {
    const res = await request(app).get(`/categories/123/subtree`);

    expect(res.statusCode).toEqual(404);
  });

  it("should move a category to a new parent", async () => {
    const parentCategory1 = await insertTestCategory({ name: "Parent 1", parent_id: null });
    const parentCategory2 = await insertTestCategory({ name: "Parent 2", parent_id: null });

    const childCategory = await insertTestCategory({
      name: "Child",
      parent_id: parentCategory1.id,
    });

    const res = await request(app)
      .patch(`/categories/${childCategory.id}/parent`)
      .send({ new_parent_id: parentCategory2.id });

    expect(res.statusCode).toEqual(200);
  });

  it("should return 400 if child category is invalid", async () => {
    const parentCategory2 = await insertTestCategory({ name: "Parent 2", parent_id: null });

    const res = await request(app)
      .patch(`/categories/invalidId/parent`)
      .send({ new_parent_id: parentCategory2.id });

    expect(res.statusCode).toEqual(400);
  });

  it("should return 400 if parent category is invalid", async () => {
    const res = await request(app)
      .patch(`/categories/123/parent`)
      .send({ new_parent_id: "new_parent" });

    expect(res.statusCode).toEqual(400);
  });

  it("should return 404 if new parent catedory does not exist", async () => {
    const parentCategory1 = await insertTestCategory({ name: "Parent 1", parent_id: null });

    const childCategory = await insertTestCategory({
      name: "Child",
      parent_id: parentCategory1.id,
    });

    const res = await request(app)
      .patch(`/categories/${childCategory.id}/parent`)
      .send({ new_parent_id: 9999 });

    expect(res.statusCode).toEqual(404);
  });

  it("should return 404 if child catedory does not exist", async () => {
    const parentCategory2 = await insertTestCategory({ name: "Parent 2", parent_id: null });

    const res = await request(app)
      .patch(`/categories/9999/parent`)
      .send({ new_parent_id: parentCategory2.id });

    expect(res.statusCode).toEqual(404);
  });
});
