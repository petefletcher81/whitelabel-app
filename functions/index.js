const functions = require("firebase-functions");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const {
  adminLogin,
  setAdmin,
  removeAdmin,
  verifyAdmin,
  signUserOut,
  getPasswordReset,
} = require("./controllers/auth-endpoints");
const { isAdmin } = require("./middleware/check-auth-middleware");
const {
  getContent,
  getPageContent,
  deleteContent,
  addContent,
  updatePageContent,
} = require("./controllers/content-body-endpoints");
const {
  addImage,
  getAllImages,
  deleteImage,
  getPageImages,
  updateImageContent,
} = require("./controllers/images-endpoint");
const {
  addEnquiry,
  updateEnquiry,
  getEnquiries,
  deleteEnquiry,
} = require("./controllers/enquiries-endpoint");

const {
  getFooterContent,
  addFooterContent,
  deleteFooterContent,
  updateFooterContent,
} = require("./controllers/footer-endpoint");

const app = express(); // creates express app

app.use(cors({ origin: true }));
app.use(express.json({ extended: true })); // parse json object bodies --  where the Content-Type header matches the type option -- unicode encoding
app.use(express.urlencoded({ extended: true })); // parse bodies passed from a url ie form -- Content-Type header matches the type option -- utf-8 encoding

app.post("/admin", adminLogin);
app.post("/set-admin", isAdmin, setAdmin);
app.post("/remove-admin", isAdmin, removeAdmin);
app.post("/verify-admin", verifyAdmin);
app.post("/password-reset", getPasswordReset);
app.post("/signout", signUserOut);

/** Content */
app.get("/content", getContent);
app.get("/content/:page", getPageContent);
app.post("/content/:page/:section", addContent);
app.put("/content/:page/:section", updatePageContent);
app.delete("/content/:page/:section", deleteContent);

/** Images */
app.post("/images/:page/:type", addImage);
app.get("/images", getAllImages);
app.get("/images/:page/:type", getPageImages);
app.put("/images/:page/:updatedPage", updateImageContent);
app.delete("/images/:name", deleteImage);

/** footer */
app.get("/footer", getFooterContent);
app.post("/footer/:area", addFooterContent);
app.put("/footer/:area", updateFooterContent);
app.delete("/footer/:area", deleteFooterContent);

/** enquires */
app.post("/enquiries", addEnquiry);
app.get("/enquiries", getEnquiries);
app.put("/enquiries/:email", updateEnquiry);
app.delete("/enquiries/:name", deleteEnquiry);

app.use((req, res) => {
  res.send({ message: "Path does not exist" });
});

// onRequest takes a https function
// app will turn into multiple different routes
exports.app = functions.region("europe-west2").https.onRequest(app);
