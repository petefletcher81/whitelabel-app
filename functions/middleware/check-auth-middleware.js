/** Check user is admin */
const { admin } = require("../config/adminFirebaseConfig");
// initializes the admin sdk in the app
const {
  authErrorHandler,
} = require("../utils/errorHandlers/auth-error-handler");

exports.isAdmin = async (req, res, next) => {
  let idToken;

  // pull out into a helper function
  if (!req.headers.authorization) {
    res.status(403).json({ message: "Not authorized" });
  }

  idToken = req.headers.authorization.split("Bearer ")[1];

  // Verify the ID token first.
  try {
    console.log("getClaims");
    const getClaims = await admin.auth().verifyIdToken(idToken);
    console.log("something", getClaims);
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