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
const { getAll, deleteItem } = require("./shared-crud-calls");

exports.addContent = async (req, res) => {
  const { page, section } = req.params;
  const { heading, content } = req.body;
  const { position } = req.query;

  const newContent = contentBuilder(heading, content, section, page, position);

  // validation
  const isValid = contentValidation(page, section, heading, content, position);

  if (isValid) {
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
  } else {
    contentErrorHandler(req, res);
  }
};

exports.getContent = async (req, res) => {
  let contentArray = ["home", "aboutus", "contactus"];

  const result = await Promise.all(
    contentArray.map(async (content, i) => {
      let items = [];
      const page = contentArray[i];
      try {
        const itemsRef = await admin.firestore().collection(`${content}`);
        const allitems = await itemsRef.get();
        if (allitems.size === 0) {
          return res.send({
            message: `Content for ${content} does not exist or there are no items available`,
          });
        } else {
          allitems.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data(), page: page });
          });
        }
      } catch (error) {
        res
          .status(400)
          .json({ message: `Something went wrong cannot retrieve ${content}` });
      }
      return items;
    })
  );
  return res.status(200).json(result.flatMap((val) => val));
};

exports.getPageContent = async (req, res) => {
  const { page } = req.params;

  if (!page) {
    return contentErrorHandler(req, res);
  }

  getAll(req, res);
};

exports.updatePageContent = async (req, res) => {
  const { heading, content } = req.body;
  const { page, section } = req.params;
  const { position } = req.query;

  // refactored the content out into a builder
  const newContent = contentBuilder(heading, content, page, position);

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
  await deleteItem(req, res);
};
