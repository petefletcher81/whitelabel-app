const functions = require("firebase-functions");
const { dateFormatter } = require("./date-formatter");

exports.contentBuilder = (heading, content, page, position) => {
  return {
    heading,
    content,
    createdAt: dateFormatter(),
    page,
    position,
  };
};

exports.imageContentBuilder = (body, position, updatedPage) => {
  const { gallery, image, banner, key } = body;

  const contentObj = {
    ...(banner && { banner: banner }),
    ...(image && { image: image }),
    ...(gallery && { gallery: gallery }),
    createdAt: dateFormatter(),
    // if we dont send a position - we send to gallery
    section: updatedPage,
    ...(position && { position: position }),
    key,
  };

  functions.logger.log("CONTENT BUILT", contentObj);
  return contentObj;
};
