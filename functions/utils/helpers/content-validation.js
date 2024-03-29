exports.contentValidation = (heading, content, section, page, position) => {
  // validation section
  const pages = ["home", "aboutus", "contactus", "footer"];
  const sections = ["1", "2", "3"];

  if (!page || !section || (content && !position)) {
    return false;
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
        return false;
      }

      // if it does about page and section doesnt exist
      if (page === "aboutus" && sectionArea === "3") {
        return false;
      }
    }

    if (!heading || !content) {
      return false;
    }
  }
  return true;
};

exports.imageContentValidation = (body, position, updatedPage) => {
  if (!updatedPage) return false;
  // TODO - could probs use array.some here

  if (
    body.hasOwnProperty("image") ||
    body.hasOwnProperty("banner") ||
    body.hasOwnProperty("gallery")
  ) {
    return true;
  } else return false;
};
