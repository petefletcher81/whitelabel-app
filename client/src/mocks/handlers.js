import { rest } from "msw";

export const handlers = [
  rest.post(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/password-reset",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "Please check your emails to reset the password",
        })
      );
    }
  ),
];
