const admin = require("firebase-admin");
admin.initializeApp(); // initializes the admin sdk in the app
// initialise firebase and give the config
// set up app in firebase
const { firebaseConfig } = require("../utils/firebase-config");
const firebase = require("firebase");

// extract into helper function
// var firebaseConfig = {
//   apiKey: "AIzaSyDqrslnURHkGtX5ab3QESxj1N2EAmhkFB8",
//   authDomain: "whitelabel-website-7d72b.firebaseapp.com",
//   databaseURL: "https://whitelabel-website-7d72b.firebaseio.com",
//   projectId: "whitelabel-website-7d72b",
//   storageBucket: "whitelabel-website-7d72b.appspot.com",
//   messagingSenderId: "754909684468",
//   appId: "1:754909684468:web:1e6274afbfbf255cf6b4a1",
// };

firebase.initializeApp(firebaseConfig);

exports.adminLogin = async (req, res) => {
  // get the GET working first then write post
  // deconstruct body
  const { email, password } = req.body;
  // need to make a async request
  // https://medium.com/javascript-in-plain-english/async-await-javascript-5038668ec6eb

  // set firebase admin sdk
  // npm install fiebase admin / install firebase
  console.log("data", email, password);

  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return res.json(data);
    // explain and add signin test
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
