const { db, admin } = require("../config/admin-config");
// initializes the admin sdk in the app
const {
  authErrorHandler,
} = require("../utils/errorHandlers/auth-error-handler");
const {
  contentErrorHandler,
} = require("../utils/errorHandlers/content-error-handler");
const { contentBuilder } = require("../utils/helpers/content-builder");
const { contentValidation } = require("../utils/helpers/content-validation");

exports.addContent = async (req, res) => {
  const { page, section } = req.query;
  const { heading, content } = req.body;

  // refactor section
  const newContent = contentBuilder(heading, content, section);

  // validation

  contentValidation(page, section, heading, content, req, res);

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

exports.getContent = async (req, res) => {
  const { page } = req.query;
  let pageConent = [];

  if (!page) {
    return contentErrorHandler(req, res);
  }

  try {
    const contentRef = await db.collection(`${page}`);
    const allContent = await contentRef.get();

    if (allContent.size === 0) {
      res.status(400).json({ message: "This page does not exist" });
    } else {
      allContent.forEach((doc) => {
        pageConent.push({ id: doc.id, ...doc.data() });
      });

      return res.status(200).json(pageConent);
    }
  } catch (error) {
    res.send({
      message: `Sorry, something went wrong -- could not find any ${page} page or content`,
      error,
    });
  }
};

exports.updateContent = async (req, res) => {
  const { heading, content } = req.body;
  const { page, section } = req.query;

  // refactored the content out into a builder
  const newContent = contentBuilder(heading, content, section);

  // refactored validator
  contentValidation(page, section, heading, content, req, res);

  try {
    const contentRef = await db.collection(`${page}`).doc(`${section}`);
    const doc = await contentRef.get();

    if (!doc.exists) {
      return res.status(400).json({ message: `The ${page} does not exist` });
    } else {
      await db.collection(`${page}`).doc(`${section}`).set(newContent);
      res.status(201).json({
        message: `Content has been updated to ${section} on ${page} page`,
      });
    }
  } catch (error) {
    const errorMessage = authErrorHandler(error.code);
    const { status, message } = errorMessage;

    res.status(status).json({ error: message });
  }
};

exports.deleteContent = async (req, res) => {
  const { page, section } = req.query;

  try {
    const contentRef = await db.collection(`${page}`).doc(`${section}`);
    const doc = await contentRef.get();

    if (!doc.exists) {
      return res.status(400).json({ message: "This content does not exist" });
    } else {
      await db.collection(`${page}`).doc(`${section}`).delete();

      return res
        .status(200)
        .json({ message: "Content has been deleted", section });
    }
  } catch (error) {
    res.secd({ error });
  }
};
