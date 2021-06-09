const { db } = require("../config/admin-config");
// initializes the admin sdk in the app
const {
  authErrorHandler,
} = require("../utils/errorHandlers/auth-error-handler");

const { dateFormatter } = require("../utils/helpers/date-formatter");

const { getAll, deleteItem } = require("./shared-crud-calls");

exports.addEnquiry = async (req, res) => {
  const { name, email } = req.body;

  const enquiry = {
    name,
    email,
    createdAt: dateFormatter(),
    contacted: false,
    key: email,
  };

  try {
    const contentRef = await db.collection(`enquiries`).doc(`${email}`);
    const doc = await contentRef.get();

    if (!doc.exists) {
      await db.collection(`enquiries`).doc(`${email}`).set(enquiry);

      res
        .status(201)
        .json({ message: `Thank you ${name}, someone will contact you soon` });
    } else {
      res.status(400).send({
        message: `Hey, this email already exists, someone will contact you soon`,
      });
    }
  } catch (error) {
    // add middleware and get the same auth errors
    const errorMessage = authErrorHandler(error.code);
    const { status, message } = errorMessage;

    res.status(status).json({ error: message });
  }
};

exports.updateEnquiry = async (req, res) => {
  const { name, email, contacted } = req.body;

  const enquiry = {
    name,
    email,
    createdAt: dateFormatter(),
    contacted,
    key: email,
  };

  try {
    const contentRef = await db.collection(`enquiries`).doc(`${email}`);
    const doc = await contentRef.get();

    if (!doc.exists) {
      res.status(400).send({
        message: `Hey, this email doesnt exist`,
      });
    } else {
      await db.collection(`enquiries`).doc(`${email}`).set(enquiry);

      res
        .status(201)
        .json({ message: `The enquiry for ${email}, has been updated` });
    }
  } catch (error) {
    // add middleware and get the same auth errors
    const errorMessage = authErrorHandler(error.code);
    const { status, message } = errorMessage;

    res.status(status).json({ error: message });
  }
};
exports.getEnquiries = async (req, res) => {
  getAll(req, res);
};

exports.deleteEnquiry = async (req, res) => {
  await deleteItem(req, res);
  return res.status(200).json({ message: "This enquiry has now been deleted" });
};
