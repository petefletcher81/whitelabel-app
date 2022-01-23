const { v4: uuidv4 } = require("uuid");
const functions = require("firebase-functions");
const { getAll, deleteItem } = require("./shared-crud-calls");
const { db, admin } = require("../config/admin-config");
const fbConfig = require("../config/firebase-config");
const Busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
const {
  authErrorHandler,
} = require("../utils/errorHandlers/auth-error-handler");
const { dateFormatter } = require("../utils/helpers/date-formatter");
const { firebaseConfig } = require("../config/firebase-config");
const { imageContentBuilder } = require("../utils/helpers/content-builder");
const {
  imageContentValidation,
} = require("../utils/helpers/content-validation");
const {
  contentErrorHandler,
} = require("../utils/errorHandlers/content-error-handler");
const { resourceLimits } = require("worker_threads");

exports.addImage = (req, res) => {
  const { page, type } = req.params;
  const { position } = req.query;

  const busboy = new Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();

  // This object will accumulate all the fields, keyed by their name
  const fields = {};

  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads = {};

  // This code will process each non-file field in the form.
  busboy.on("field", (fieldname, val) => {
    functions.logger.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });

  const fileWrites = [];

  // This code will process each file uploaded.
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    let filesArray = [];
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.

    functions.logger.log(`Processed file ${filename}`);
    // randomnumber.png
    const filepath = path.join(tmpdir, filename);
    uploads[filename] = filepath;
    uploads["type"] = mimetype;

    filesArray.push(uploads[filename]);
    // creates a writeble atream to the filepath
    const writeStream = fs.createWriteStream(filepath);

    // pipes the data we get from the post into that stream
    file.pipe(writeStream);

    // push to the correct array
    fileWrites.push(filesArray);
  });

  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on("finish", () => {
    // we need the alt media so that it loads image in web browser instead of downloading it

    fileWrites.forEach(async ([file], index) => {
      let filename = file.split("\\").pop();
      functions.logger.log("======", filename);
      if (filename.includes("tmp")) {
        trimmedFilename = filename.split("/")[2];
        filename = trimmedFilename;
      }
      // we wil need this when we add in the image to storage
      let docAdded = false;

      let url = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${filename}?alt=media`;

      let imageType = type;

      const newImage = {
        id: uuidv4(),
        [imageType]: url,
        createdAt: dateFormatter(),
        section: page,
        key: filename,
        position: page === "home" ? position : null,
      };

      if (page === "aboutus" && imageType === "banner") {
        return res.send({ message: "No banners can be added to this page" });
      }

      try {
        // we need the to call the collections to then check the amount within
        // each page does not exceed the amount of room we have
        const imageCollection = await db.collection("images");
        const collectionSnapshot = await imageCollection.get();

        // we then will check if the actual image file exists
        const imageRef = await db.collection(`images`).doc(`${filename}`);
        const doc = await imageRef.get();

        // create an array to push the docs and then reduce and make a tally
        let documentArray = [];

        // set out images limit for each of the pages
        // Change Here !!!!
        const homeImageLimit = 3;
        const aboutUsImageLimit = 2;
        const contactUsImageLimit = 2;
        const homeBannerLimit = 1;
        const contactUsBannerLimit = 1;

        // get the amount of files uploaded
        let fileAmount = fileWrites.length;

        if (imageType === "image" && fileAmount > 3)
          return res
            .status(400)
            .json({ message: "Too many files added, 3 is the maximum images" });

        if (imageType === "banner" && fileAmount > 1)
          return res.status(400).json({
            message: "Too many files added, 1 is the maximum for banners",
          });

        // if it exists - validition process
        collectionSnapshot.forEach((doc) => {
          documentArray.push(doc.data());
        });

        const collectionTallies = documentArray.reduce((tally, collection) => {
          // how to get banner key
          // I think this is already passed
          let type = Object.keys(collection).find((key) => {
            return key === "image" || key === "banner";
          });

          let collectionSection = collection["section"];

          // check if the section exists
          if (tally[collectionSection]) {
            // as it nested we need to then check it the type exists
            // or it will be overridden
            if (tally[collectionSection][type]) {
              tally[collectionSection][type] += 1;
            } else {
              tally[collectionSection][type] = 1;
            }

            // if the sectrion doesnt exist it is fine to create it
            // the we assign the value
          } else {
            // need to initialize first as the image type will be undefined
            tally[collectionSection] = {};
            tally[collectionSection][type] = 1;
          }

          return tally;
        }, {});

        // validate helper
        const validatePageKeys = (page) => {
          return Object.keys(collectionTallies).includes(page);
        };

        // validat the image amount -- could become a helper function
        const validateImageAmount = (
          fileAmount,
          collectionTallies,
          contactUsImageLimit,
          aboutUsImageLimit,
          homeImageLimit,
          page
        ) => {
          if (Object.keys(collectionTallies).length === 0) {
            return true;
          }
          const homeImageCount = validatePageKeys("home");

          const contactusImageCount = validatePageKeys("contactus");

          const aboutusImageCount = validatePageKeys("aboutus");
          switch (page) {
            case "home":
              if (
                homeImageCount &&
                fileAmount + collectionTallies.home.image > homeImageLimit
              ) {
                return false;
              } else {
                return true;
              }
            case "contactus":
              if (
                contactusImageCount &&
                fileAmount + collectionTallies.contactus.image >
                  contactUsImageLimit
              ) {
                return false;
              } else {
                return true;
              }
            case "aboutus":
              if (
                aboutusImageCount &&
                fileAmount + collectionTallies.aboutus.image > aboutUsImageLimit
              ) {
                return false;
              } else {
                return true;
              }
            default:
              break;
          }
        };

        const validateBannerAmount = (
          page,
          fileAmount,
          homeBannerLimit,
          contactUsBannerLimit,
          collectionTallies
        ) => {
          if (Object.keys(collectionTallies).length === 0) {
            return true;
          }

          const homeImageCount = validatePageKeys("home");

          const contactusImageCount = validatePageKeys("contactus");

          switch (page) {
            case "home":
              if (
                homeImageCount &&
                fileAmount + collectionTallies.home.banner > homeBannerLimit
              ) {
                return false;
              } else {
                return true;
              }
            case "contactus":
              if (
                contactusImageCount &&
                fileAmount + collectionTallies.contactus.banner >
                  contactUsBannerLimit
              ) {
                return false;
              } else {
                return true;
              }

            default:
              break;
          }
        };

        const validateGallery = (page, type) => {
          if (Object.keys(collectionTallies).length === 0) {
            return true;
          }
          if (page === "aboutus" && type === "gallery") {
            return true;
          } else {
            return false;
          }
        };

        // Check if the image already exists
        if (!doc.exists) {
          let isValid;
          if (imageType === "image") {
            isValid = validateImageAmount(
              fileAmount,
              collectionTallies,
              contactUsImageLimit,
              aboutUsImageLimit,
              homeImageLimit,
              page
            );
          } else if (imageType === "banner") {
            isValid = validateBannerAmount(
              fileAmount,
              collectionTallies,
              homeBannerLimit,
              contactUsBannerLimit,
              page
            );
          } else {
            // if gallery and can upload ans many as they want
            isValid = validateGallery(page, imageType);
          }

          if (isValid) {
            await admin
              .firestore()
              .collection(`images`)
              .doc(`${filename}`)
              .set(newImage);

            docAdded = true;
          } else {
            return res.status(400).json({
              message: `Over the limit for images for this page or area doesnt exist on the page`,
            });
          }
        } else {
          return res.status(400).json({
            message: "This image already exists",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          message: "Something went wrong when trying to add the image",
          error,
        });
      }

      if (docAdded) {
        try {
          await admin
            .storage()
            .bucket()
            .upload(file, {
              resumable: false,
              metadata: {
                metadata: {
                  contentType: filename.split(".").pop(),
                  // needed this below to create an access token
                  firebaseStorageDownloadTokens: newImage.id,
                },
              },
            });

          return res
            .status(201)
            .json({ message: "Image was successfully added" });
        } catch (error) {
          return res.status(400).json({
            message: "Something went wrong in the upload",
          });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Document did not add correctly", error });
      }
    });
  });

  busboy.end(req.rawBody);
};

exports.getAllImages = async (req, res) => {
  getAll(req, res);
};

exports.getPageImages = async (req, res) => {
  const { page, type } = req.params;

  let items = [];

  try {
    const itemsRef = await admin.firestore().collection("images");

    const groupImages = await itemsRef.get();

    if (groupImages.size === 0) {
      return res.send({
        message: `Cant find images for this page does not exist or there are no items available`,
      });
    } else {
      groupImages.forEach((doc) => {
        console.log(doc.data());
        const filteredImage = doc.data();
        if (
          filteredImage.section === page &&
          filteredImage.hasOwnProperty(type)
        ) {
          items.push({ id: doc.id, ...doc.data() });
        }
      });
      return res.status(200).json(items);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: `Something went wront cannot retrieve images` });
  }
};

exports.updateImageContent = async (req, res) => {
  const homepagePositions = ["1", "2", "3"];

  if (!req.body.key)
    return res.status(400).json({
      message:
        "Something went wrong while trying to update or the image content",
    });

  // page: what page is it on
  /* updatedPage: wheres it going to?
  homepage: this has 3 different sections
  aboutus: this will always be the 'aboutus' as its in the gallery
  contactus: will always be 'contactus' as there is only one banner
  */

  // does it have a position?
  const { position } = req.query;
  const { page, updatedPage } = req.params;

  if (
    updatedPage === "home" &&
    !homepagePositions.some((p) => p === position)
  ) {
    return res.status(400).json({
      message: "Sorry invalid position for this page",
    });
  }

  if (updatedPage !== "home" && position > 1) {
    return res.status(400).json({
      message: "Sorry invalid position for this page",
    });
  }

  const isValid = imageContentValidation(req.body, position, updatedPage);
  const newContent = imageContentBuilder(req.body, position, updatedPage);

  if (!isValid)
    return res.status(400).json({
      message:
        "Something went wrong while trying to validate the content or the image content",
    });

  if (isValid) {
    console.log("Content Valid");
    try {
      const contentRef = await db.collection(`images`).doc(`${newContent.key}`);
      const doc = await contentRef.get();

      if (!doc.exists) {
        return res.status(400).json({ message: `The content does not exist` });
      } else {
        let items = [];

        const updatedContent = {
          id: Object.values(doc.data().id).join(""),
          ...newContent,
        };

        const imageCollection = await db.collection("images");
        const collectionQuery = await imageCollection
          .where("section", "==", updatedPage)
          .get();

        collectionQuery.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });

        /* check position doesnt already exist */
        let positionExists;

        if (position !== undefined) {
          positionExists = items.find(
            (content) => content.position === position
          );
        }

        if (positionExists) {
          return res.status(400).json({
            message: `The content already exists within this position`,
          });
        } else {
          await db
            .collection(`images`)
            .doc(updatedContent.key)
            .set(updatedContent);
          return res.status(201).json({
            message: `Image has been updated with the new content`,
          });
        }
      }
    } catch (error) {
      const errorMessage = authErrorHandler(error.code);
      const { status, message } = errorMessage;

      res.status(status).json({ error: message });
    }
  }
};

exports.deleteImage = async (req, res) => {
  const { name } = req.params;
  await deleteItem(req, res);

  try {
    const file = await admin.storage().bucket().file(name);
    file.delete();

    return res
      .status(200)
      .json({ message: "This content has now been deleted" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "failed to delete image from bucket" });
  }
};
