const { v4: uuidv4 } = require("uuid");
const { getAll, deleteItem } = require("./shared-crud-calls");
const { db, admin } = require("../config/admin-config");
const fbConfig = require("../config/firebase-config");
const Busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { firebase } = require("../config/firebase-config");

exports.addImage = (req, res) => {
  const { page, type } = req.params;

  const busboy = new Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();

  // This object will accumulate all the fields, keyed by their name
  const fields = {};

  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads = {};

  // This code will process each non-file field in the form.
  busboy.on("field", (fieldname, val) => {
    /**
     *  TODO(developer): Process submitted field values here
     */
    console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });

  const fileWrites = [];

  // This code will process each file uploaded.
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    let filesArray = [];
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    console.log(`Processed file ${filename}`);
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
      // we wil need this when we add in the image to storage
      let docAdded = false;

      let url = `https://firebasestorage.googleapis.com/v0/b/${fbConfig.firebaseConfig.storageBucket}/o/${filename}?alt=media`;

      let imageType = type;

      const newImage = {
        id: uuidv4(),
        [imageType]: url,
        createdAt: new Date().toISOString(),
        section: page,
      };

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
        const homeLimit = 3;
        const aboutUsLimit = 2;
        const contactUsLimit = 2;

        // get the amount of files uploaded
        let fileAmount = fileWrites.length;

        if (fileAmount > 3)
          return res
            .status(400)
            .json({ message: "Too many files added, 3 is the maximum" });

        // if it exists - validition process
        collectionSnapshot.forEach((doc) => {
          documentArray.push(doc.data());
        });

        // count all the sections already there, set defaults so we dont get undefined
        const sectionTallies = documentArray.reduce(
          (currentTally, currentSection) => {
            currentTally[currentSection.section] =
              (currentTally[currentSection.section] || 0) + 1;
            return currentTally;
          },
          { home: 0, aboutus: 0, contactus: 0 }
        );

        // valid the image amount -- could become a helper function
        const validateImageAmount = (
          fileAmount,
          sectionTallies,
          homeLimit,
          contactUsLimit,
          aboutUsLimit,
          page
        ) => {
          switch (page) {
            case "home":
              if (fileAmount + sectionTallies.home > homeLimit) {
                return false;
              } else return true;
              break;
            case "aboutus":
              if (fileAmount + sectionTallies.aboutus > aboutUsLimit) {
                return false;
              } else true;
              break;
            case "contactus":
              if (fileAmount + sectionTallies.contactus > contactUsLimit) {
                return false;
              } else true;
              break;

            default:
              break;
          }
        };

        // Check if the image already exists
        if (!doc.exists) {
          const isValid = validateImageAmount(
            fileAmount,
            sectionTallies,
            homeLimit,
            contactUsLimit,
            aboutUsLimit,
            page
          );

          if (isValid) {
            await admin
              .firestore()
              .collection(`images`)
              .doc(`${filename}`)
              .set(newImage);

            docAdded = true;
          } else {
            return res.status(400).json({
              message:
                "Over the limit for images for this page, please remove or select fewer images",
            });
          }
        } else {
          return res.status(400).json({
            message: "This image already exists",
          });
        }
      } catch (error) {
        return res.status(400).json({
          message: "Something went wrong when trying to add the product",
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
