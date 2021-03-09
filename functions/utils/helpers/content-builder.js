const { response } = require("express");

exports.contentBuilder = (heading, content) => {
  const contentObj = {
    heading,
    content,
    createdAt: new Date().toISOString(),
  };

  return contentObj;
};
