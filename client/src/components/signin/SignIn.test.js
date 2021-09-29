import "@testing-library/react";
import nock from "nock";
import React from "react";
import { server } from "../../mocks/server.js";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "../../test-utils/custom-utils";
import SignIn from "./SignIn";

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
    const postReply = {
      token: "thisisatoken",
    };

    const enquiry = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .post("/admin", { password: "test", email: "Fred@flintstone.com" })
      .reply(200, postReply, [
        "Access-Control-Allow-Origin",
        "http://localhost",
        "Content-Type",
        "application/json; charset=utf-8",
      ]);

    const options = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .options("/admin")
      .reply(204, "", [
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin",
        "http://localhost",
      ]);

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

    enquiry.done();
    options.done();
  });

  it("should alert user if password is incorrect", async () => {
    const inputValuePassword = "test";
    const inputValueEmail = "Fred@flintstone.com";
    const postReply = {
      error: "Invalid password",
    };

    const enquiry = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .post("/admin", { password: "test", email: "Fred@flintstone.com" })
      .reply(400, postReply, [
        "Access-Control-Allow-Origin",
        "http://localhost",
        "Content-Type",
        "application/json; charset=utf-8",
      ]);

    const options = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .options("/admin")
      .reply(204, "", [
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin",
        "http://localhost",
      ]);

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

    enquiry.done();
    options.done();
  });

  it("should alert user if user is incorrect", async () => {
    const inputValuePassword = "test";
    const inputValueEmail = "Fred@flintstone.com";
    const postReply = {
      error: "User not found",
    };

    const enquiry = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .post("/admin", { password: "test", email: "Fred@flintstone.com" })
      .reply(400, postReply, [
        "Access-Control-Allow-Origin",
        "http://localhost",
        "Content-Type",
        "application/json; charset=utf-8",
      ]);

    const options = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .options("/admin")
      .reply(204, "", [
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin",
        "http://localhost",
      ]);

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

    enquiry.done();
    options.done();
  });
});

describe("Password Reset", () => {
  beforeAll(() => server.listen());

  afterEach(() => {
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
