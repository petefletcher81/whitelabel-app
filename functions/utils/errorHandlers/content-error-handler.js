exports.contentErrorHandler = (req, res) => {
  return res.status(400).json({
    message: "Something went wrong while trying to add content",
  });
};
