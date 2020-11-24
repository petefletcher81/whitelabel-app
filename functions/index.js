const functions = require("firebase-functions");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const {
  adminLogin,
  setAdmin,
  removeAdmin,
  verifyAdmin,
} = require("./controllers/auth-endpoints");

const { addContent } = require("./controllers/content-body-endpoints");
const { isAdmin } = require("./middleware/check-auth-middleware");

const app = express(); // creates express app

app.use(cors({ origin: true }));
app.use(bodyParser.json({ extended: true })); // parse json object bodies --  where the Content-Type header matches the type option -- unicode encoding
app.use(bodyParser.urlencoded({ extended: true })); // parse bodies passed from a url ie form -- Content-Type header matches the type option -- utf-8 encoding

/** Admin endpoints */
app.post("/admin", adminLogin);
app.post("/set-admin", isAdmin, setAdmin);
app.post("/remove-admin", isAdmin, removeAdmin);
app.post("/verify-admin", verifyAdmin);

/** Content */
app.get("/content/body-one");
app.post("/content/body", addContent);
app.put("/content/body-one");
app.delete("/content/body-one");

app.get("/content/body-two");
app.post("/content/body-two");
app.put("/content/body-two");
app.delete("/content/body-two");

app.get("/content/body-three");
app.post("/content/body-three");
app.put("/content/body-three");
app.delete("/content/body-three");

app.get("/content/first-image");
app.post("/content/first-image");
app.put("/content/first-image");
app.delete("/content/first-image");

app.get("/content/second-image");
app.post("/content/second-image");
app.put("/content/second-image");
app.delete("/content/second-image");

app.get("/content/third-image");
app.post("/content/third-image");
app.put("/content/third-image");
app.delete("/content/third-image");

app.get("/content/gallery-images");
app.post("/content/gallery-images");
app.put("/content/gallery-images");
app.delete("/content/gallery-images");

app.get("/content/footer");
app.post("/content/footer");
app.put("/content/footer");
app.delete("/content/footer");

app.use((req, res) => {
  res.send({ message: "Path does not exist" });
});

// onRequest takes a https function
// app will turn into multiple different routes
exports.app = functions.region("europe-west2").https.onRequest(app);
