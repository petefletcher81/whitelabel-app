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

exports.addFooterContent = async (req, res) => {
  const { area } = req.params;
  const { content } = req.body;
  const collection = req.url.split("/")[1];
  const areas = ["company", "social"];

  if (!content || !areas) {
    return res.status(400).json({ message: "There is no content to be added" });
  } else {
    const validArea = areas.filter((footerArea) => {
      return footerArea === area;
    });

    // will need validation for the fields that are allowed in the object

    const newFooterContent = {
      ...content,
      key: area,
      page: "footer",
    };

    if (validArea.length > 0) {
      try {
        const contentRef = await db.collection(collection).doc(area);
        const doc = await contentRef.get();

        if (!doc.exists) {
          await db.collection(collection).doc(area).set(newFooterContent);

          res.status(201).json({ message: `New content added to ${area}` });
        } else {
          res
            .status(400)
            .send({ message: `This content already exists for ${area}` });
        }
      } catch (error) {
        // add middleware and get the same auth errors
        const errorMessage = authErrorHandler(error.code);
        const { status, message } = errorMessage;

        res.status(status).json({ error: message });
      }
    } else {
      return res
        .status(400)
        .json({ message: "The content is not valid for this collection" });
    }
  }
};

exports.getFooterContent = async (req, res) => {
  getAll(req, res);
};
exports.deleteFooterContent = async (req, res) => {
  // amendments needed in the delete all
  deleteItem(req, res);
};

exports.updateFooterContent = async (req, res) => {
  const { area } = req.params;
  const { content } = req.body;
  const collection = req.url.split("/")[1];
  const areas = ["company", "social"];
  console.log("11111111111111", content);

  if (!content || !areas) {
    return res.status(400).json({ message: "There is no content to be added" });
  } else {
    const validArea = areas.filter((footerArea) => {
      return footerArea === area;
    });

    // will need validation for the fields that are allowed in the object

    const newFooterContent = {
      ...content,
      key: area,
      page: "footer",
    };

    if (validArea.length > 0) {
      try {
        const contentRef = await db.collection(collection).doc(area);
        const doc = await contentRef.get();

        /** The only difference with post and put
         *  is that the !doc.exists if is inverted
         */
        if (!doc.exists) {
          return res
            .status(400)
            .send({ message: `This content already exists for ${area}` });
        } else {
          await db.collection(collection).doc(area).set(newFooterContent);

          res.status(201).json({ message: `New content added to ${area}` });
        }
      } catch (error) {
        // add middleware and get the same auth errors
        const errorMessage = authErrorHandler(error.code);
        const { status, message } = errorMessage;

        res.status(status).json({ error: message });
      }
    } else {
      return res
        .status(400)
        .json({ message: "The content is not valid for this collection" });
    }
  }
};
