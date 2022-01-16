/** Check user is admin */
const { admin } = require("../config/admin-config");
const functions = require("firebase-functions");
// initializes the admin sdk in the app
const {
  authErrorHandler,
} = require("../utils/errorHandlers/auth-error-handler");

exports.isAdmin = async (req, res, next) => {
  let idToken;

  // pull out into a helper function
  functions.logger.log(
    "HAS AUTH HEADERs",
    req.headers.authorization.split(",")[1]
  );
  if (!req.headers.authorization) {
    res.status(403).json({ message: "Not authorized" });
  }

  // "Bearer token,eysklfsklf"
  idToken = req.headers.authorization.split("Bearer ")[1].split(",")[1];

  // Verify the ID token first.
  try {
    const getClaims = await admin.auth().verifyIdToken(idToken);
    functions.logger.log("is Admin? ISADMIN", getClaims);
    if (getClaims.admin === true) {
      return next();
    } else {
      res.status(403).json({ error: "User not admin" });
    }
  } catch (error) {
    const errorMessage = authErrorHandler(error.code);
    const { status, message } = errorMessage;

    res.status(status).json({ error: message });
  }
};
