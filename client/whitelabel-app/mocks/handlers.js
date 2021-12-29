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

  rest.put(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content/home/section-1",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has been successfully updated",
        })
      );
    }
  ),

  rest.put(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/enquiries/test1@test.com",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has been successfully updated",
        })
      );
    }
  ),

  rest.put(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/footer/company",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has been successfully updated",
        })
      );
    }
  ),

  rest.put(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/footer/social",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has been successfully updated",
        })
      );
    }
  ),

  rest.put(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content/home/section-1",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has been successfully updated",
        })
      );
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

  rest.put(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/footer/social",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has been successfully updated",
        })
      );
    }
  ),

  rest.options(
    "http://localhost:5000/whitelabel-website-7d72b/europe-west2/app/footer/social",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),

  rest.options(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/footer",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),

  rest.options(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content/home/section-1",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),

  rest.delete(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/images/test-filename",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has now been deleted",
        })
      );
    }
  ),

  rest.delete(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content/home/section-1",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has now been deleted",
        })
      );
    }
  ),

  rest.delete(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/enquiries/test1@test.com",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has now been deleted",
        })
      );
    }
  ),

  rest.delete(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/footer/company",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has now been deleted",
        })
      );
    }
  ),

  rest.delete(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/footer/social",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          message: "This content has now been deleted",
        })
      );
    }
  ),
];

export const errorHandlers = [];
