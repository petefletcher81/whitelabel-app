// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server";

Object.defineProperty(window.document, "cookie", {
  writable: true,
  value: "token=sdafoihskjdf",
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(() => {
    return { token: "qwerty" };
  }),
  removeItem: jest.fn(() => {}),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        "Found an unhandled %s request to %s",
        req.method,
        req.url.href
      );
    },
  });
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
