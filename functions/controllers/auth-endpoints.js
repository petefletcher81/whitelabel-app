const { admin } = require("../config/admin-config");
// initialise firebase and give the config
// set up app in firebase
const { firebase } = require("../config/firebase-config");

// removed firebase

const {
  authErrorHandler,
} = require("../utils/errorHandlers/auth-error-handler");

exports.adminLogin = async (req, res) => {
  // get the GET working first then write post
  // deconstruct body
  let token;
  const { email, password } = req.body;
  // need to make a async request
  // https://medium.com/javascript-in-plain-english/async-await-javascript-5038668ec6eb

  // set firebase admin sdk
  // npm install firebase admin / install firebase
  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const userToken = await data.user.getIdToken();
    token = userToken;
    return res.json({ token });
    // explain and add signin test
  } catch (error) {
    const errorMessage = authErrorHandler(error.code);
    const { status, message } = errorMessage;

    res.status(status).json({ error: message });
  }
};

exports.setAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const userRef = await admin.auth().getUserByEmail(email);
    if (
      userRef.customClaims !== undefined &&
      Object.keys(userRef.customClaims).length > 0
    ) {
      // once we set the custom claims on a user they will stay there
      // we can only then set them

      return res.json({ message: `${userRef.email} is already an admin` });
    } else {
      try {
        await admin.auth().setCustomUserClaims(userRef.uid, { admin: true });
        return res.json({ message: `User is now an admin` });
      } catch (error) {
        return res.json({ message: "Unable to set user as admin" });
      }
    }
  } catch (error) {
    // Extract and create error handler
    const errorMessage = authErrorHandler(error.code);
    const { status, message } = errorMessage;

    res.status(status).json({ error: message });
  }
};

exports.removeAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    const userRef = await admin.auth().getUserByEmail(email);
    if (userRef.customClaims === undefined) {
      res.json({ message: "User is not set as an admin" });
    } else {
      if (userRef["customClaims"]) {
        await admin.auth().setCustomUserClaims(userRef.uid, null);

        res.send({ message: "Admin has been removed from this user" });
      }
    }
  } catch (error) {
    const errorMessage = authErrorHandler(error.code);
    const { status, message } = errorMessage;

    res.status(status).json({ error: message });
  }
};

exports.verifyAdmin = async (req, res) => {
  // if no auth headers
  if (
    !req.headers.authorization &&
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(403).json({ message: "Not authorized" });
  }

  // if there are auth headers
  let idToken = req.headers.authorization.split("Bearer ")[1];

  try {
    const getClaims = await admin.auth().verifyIdToken(idToken);
    if (getClaims.admin === true) {
      res.json({
        message: `${getClaims.email} is a verified admin`,
        claim: getClaims.admin,
      });
      // once we have a login that is admin, lets add another user who isnt
    } else {
      return res.json({ message: `${getClaims.email} is not admin` });
    }
  } catch (error) {
    const errorMessage = authErrorHandler(error.code);
    const { status, message } = errorMessage;

    res.status(status).json({ error: message });
  }
};

exports.getPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    await firebase.auth().sendPasswordResetEmail(email);
    res.send({ message: "Please check your email and reset your password" });
  } catch (error) {
    res.send({
      message: "Something went wrong please contact your provider",
    });
  }
};

exports.signUserOut = async (req, res) => {
  try {
    await firebase.auth().signOut();
    res.send({ message: "You have been succesfuly signed out" });
  } catch (error) {
    res.send({
      message: "You could not be signed out, please contact your provider",
    });
  }
};
