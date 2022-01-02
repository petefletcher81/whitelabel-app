import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { server } from "../mocks/server.js";
import SignIn from "../pages/i-can-signin";

describe("<SignIn />", () => {
  it("should render the signin form", async () => {
    render(<SignIn />);
    screen.getByText("Sign In");
    screen.getByPlaceholderText("Email");
    screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button", { name: "Sign In" });
    within(button).getByText("Sign In");
  });

  it("should allow the user to input and submit text", async () => {
    const inputValuePassword = "test";
    const inputValueEmail = "Fred@flintstone.com";

    render(<SignIn />);

    screen.getByTestId("signin-form");
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: inputValuePassword },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: inputValueEmail },
    });

    const button = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(button);
    await screen.findByText("Sign In Successful");
  });

  it("should alert user if password is incorrect", async () => {
    server.use(
      rest.post(
        "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/admin",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              error: "Invalid password",
            })
          );
        }
      )
    );

    const inputValuePassword = "test";
    const inputValueEmail = "Fred@flintstone.com";
    render(<SignIn />);

    screen.getByTestId("signin-form");
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: inputValuePassword },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: inputValueEmail },
    });

    const button = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(button);
    await screen.findByText("Invalid password, please try again");
  });

  it("should alert user if user is incorrect", async () => {
    server.use(
      rest.post(
        "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/admin",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              error: "User not found",
            })
          );
        }
      )
    );

    const inputValuePassword = "test";
    const inputValueEmail = "Fred@flintstone.com";
    render(<SignIn />);

    screen.getByTestId("signin-form");
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: inputValuePassword },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: inputValueEmail },
    });

    const button = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(button);
    await screen.findByText("User not found, please try again");
  });
});

describe("Password Reset", () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    console.error.mockRestore();
    cleanup();
    server.resetHandlers();
    cleanup();
  });

  afterAll(() => server.close());

  it("should render the password reset button", () => {
    render(<SignIn />);
    screen.getByTestId("signin-form");
    screen.getByRole("button", { name: "password reset" });
  });

  it("should request a new password when button is clicked", async () => {
    render(<SignIn />);

    screen.getByTestId("signin-form");
    const passwordReset = screen.getByRole("button", {
      name: "password reset",
    });

    fireEvent.click(passwordReset);
    await screen.findByText("Please check your emails to reset the password");
  });
});
