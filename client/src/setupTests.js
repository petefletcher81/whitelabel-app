import "@testing-library/jest-dom/extend-expect";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(() => {
    return { token: "qwerty" };
  }),
  removeItem: jest.fn(() => {}),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;
