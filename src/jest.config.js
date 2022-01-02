/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "babel",
  testEnvironment: "jsdom",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["json", "text", "html"],

  moduleDirectories: ["node_modules", "whitelabel-app"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // ADD This --- https://jestjs.io/docs/en/webpack
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
  },

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = createJestConfig(customJestConfig);
