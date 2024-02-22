module.exports = {
  displayName: "CATEGORY-SERVICE",
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./test",
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  globalSetup: "./jest.globalsetup.ts",
};
