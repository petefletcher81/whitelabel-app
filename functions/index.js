const functions = require("firebase-functions");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { adminLogin } = require("./controllers/user");

const app = express(); // creates express app

app.use(cors({ origin: true }));
app.use(bodyParser.json({ extended: true })); // parse json object bodies --  where the Content-Type header matches the type option -- unicode encoding
app.use(bodyParser.urlencoded({ extended: true })); // parse bodies passed from a url ie form -- Content-Type header matches the type option -- utf-8 encoding

app.post("/admin", adminLogin);

app.use((req, res) => {
  res.send({ message: "Path does not exist" });
});

// onRequest takes a https function
// app will turn into multiple different routes
exports.app = functions.region("europe-west2").https.onRequest(app);
