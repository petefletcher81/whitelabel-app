const admin = require("firebase-admin");
admin.initializeApp(); // initializes the admin sdk in the app
// initialise firebase and give the config
// set up app in firebase
const { firebaseConfig } = require("../config/firebase-config");
const firebase = require("firebase");

firebase.initializeApp(firebaseConfig);

exports.adminLogin = async (req, res) => {
  // get the GET working first then write post
  // deconstruct body
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
    switch (error.code) {
      case "auth/user-not-found":
        return res.status(404).json({ error: "User not found" });
        break;
      case "auth/wrong-password":
        return res.status(401).json({ error: "Invalid password" });
        break;

      default:
    }
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
    switch (error.code) {
      case "auth/user-not-found":
        return res.status(404).json({ error: "User not found" });
        break;
      default:
    }
    res.send({ error });
  }
};

exports.removeAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    const userRef = await admin.auth().getUserByEmail(email);
    console.log(userRef);
    if (userRef.customClaims === undefined) {
      res.json({ message: "User is not set as an admin" });
    } else {
      userWithoutCustomClaims = userRef;
      if (userWithoutCustomClaims["customClaims"]) {
        await admin.auth().setCustomUserClaims(userRef.uid, null);

        res.send({ message: "Admin has been removed from this user" });
      }
    }
  } catch (error) {
    // Extract and create error handler
    switch (error.code) {
      case "auth/user-not-found":
        return res.status(404).json({ error: "User not found" });
        break;
      default:
    }
    res.send({ error });
  }
};
