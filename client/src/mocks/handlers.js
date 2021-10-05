import { rest } from "msw";
import { contentBuilder } from "../test-utils/test-helpers";

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

  rest.post(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/signout",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "You have been succesfully signed out",
        })
      );
    }
  ),

  rest.get(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content/home",
    (req, res, ctx) => {
      const { homeContent } = contentBuilder();
      return res(ctx.status(200), ctx.json([...homeContent]));
    }
  ),

  rest.get(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/enquiries",
    (req, res, ctx) => {
      const { enquiryContent } = contentBuilder();
      return res(ctx.status(200), ctx.json([...enquiryContent]));
    }
  ),

  rest.get(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content",
    (req, res, ctx) => {
      const { allContent } = contentBuilder();
      return res(ctx.status(200), ctx.json([...allContent]));
    }
  ),

  rest.get(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content/aboutus",
    (req, res, ctx) => {
      const { aboutUsContent } = contentBuilder();
      console.log(homeContent);
      return res(ctx.status(200), ctx.json([...aboutUsContent]));
    }
  ),

  rest.get(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/images/home/image",
    (req, res, ctx) => {
      const { imageContent } = contentBuilder();
      return res(ctx.status(200), ctx.json([...imageContent]));
    }
  ),

  rest.get(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/images",
    (req, res, ctx) => {
      const { imageContent } = contentBuilder();
      return res(ctx.status(200), ctx.json([...imageContent]));
    }
  ),

  rest.get(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/footer",
    (req, res, ctx) => {
      const { footerContent } = contentBuilder();
      return res(ctx.status(200), ctx.json([...footerContent]));
    }
  ),
];

export const errorHandlers = [];
