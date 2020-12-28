const {
  contentErrorHandler,
} = require("../errorHandlers/content-error-handler");

exports.contentValidation = (page, section, heading, content, req, res) => {
  // validation section
  const pages = ["home", "about", "contactus", "footer"];
  const sections = ["one", "two", "three"];

  if (!page || !section) {
    return contentErrorHandler(req, res);
  } else {
    if (heading && content) {
      const sectionArea = section.split("-")[1];
      const validPage = pages.filter((arrayPage) => arrayPage === page);
      const validSection = sections.filter(
        (arraySection) => arraySection === sectionArea
      );

      // validate page and section
      if (validPage.length === 0 || validSection.length === 0) {
        // show not adding the return -- it still adds the
        return contentErrorHandler(req, res);
      }

      // if it does about page and section doesnt exist
      if (page === "about" && section === "three") {
        return contentErrorHandler(req, res);
      }
    }

    if (!heading || !content) {
      return contentErrorHandler(req, res);
    }
  }
};
