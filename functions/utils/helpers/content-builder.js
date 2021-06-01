const { response } = require("express");

exports.contentBuilder = (heading, content, section, page) => {
  const contentObj = {
    heading,
    content,
    createdAt: new Date().toISOString(),
    page,
  };

  return contentObj;
};
