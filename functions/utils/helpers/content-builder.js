const { dateFormatter } = require("./date-formatter");

exports.contentBuilder = (heading, content, page, position) => {
  const contentObj = {
    heading,
    content,
    createdAt: dateFormatter(),
    page,
    position,
  };

  return contentObj;
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

  console.log("content built", contentObj);
  return contentObj;
};
