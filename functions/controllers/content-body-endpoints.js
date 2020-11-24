const { db } = require("../config/adminFirebaseConfig");
// initializes the admin sdk in the app
const { authErrorHandler } = require("../utils/auth-error-handler");
const { contentErrorHandler } = require("../utils/content-error-handler");

exports.addContent = async (req, res) => {
  const { page, section } = req.query;
  const sectionArea = section.split("-")[1];

  // validation section
  const pages = ["home", "about", "contactus", "footer"];
  const sections = ["one", "two", "three"];

  const { heading, content } = req.body;

  // refactor section
  let headingArea = `heading-${sectionArea}`;
  let contentArea = `content-${sectionArea}`;

  // first iteration
  // const newContent = {
  //   heading,
  //   section,
  //   createdAt:new Date().toISOString();
  // }

  const newContent = {};
  newContent[headingArea] = heading;
  newContent[contentArea] = content;
  newContent["createdAt"] = new Date().toISOString();

  // validation
  if (!page || !section) {
    return contentErrorHandler(req, res);
  } else {
    if (heading && content) {
      const validPage = pages.filter((arrayPage) => arrayPage === page);
      const validSection = sections.filter(
        (arraySection) => arraySection === sectionArea
      );

      // validate page and section
      if (validPage.length === 0 || validSection.length === 0) {
        // show not adding the return -- it still adds the
        return contentErrorHandler(req, res);
      }

      // if it does about page and section doesnt exist
      if (page === "about" && section === "three") {
        return contentErrorHandler(req, res);
      }
    }
  }

  try {
    const contentRef = await db.collection(`${page}`).doc(`${section}`);
    const doc = await contentRef.get();

    if (!doc.exists) {
      await db.collection(`${page}`).doc(`${section}`).set(newContent);

      res.status(201).json({ message: `New content added to ${section}` });
    } else {
      res
        .status(400)
        .send({ message: `This content already exists for ${section}` });
    }
  } catch (error) {
    // add middleware and get the same auth errors
    const errorMessage = authErrorHandler(error.code);
    const { status, message } = errorMessage;

    res.status(status).json({ error: message });
  }
};
