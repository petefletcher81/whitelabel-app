const { dateFormatter } = require("./date-formatter");

exports.contentBuilder = (heading, content, section, page) => {
  const contentObj = {
    heading,
    content,
    createdAt: dateFormatter(),
    page,
  };

  return contentObj;
};
