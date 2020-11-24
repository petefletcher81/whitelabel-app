exports.contentErrorHandler = (req, res) => {
  return res.status(400).send({
    message: "Something went wrong while trying to add content",
  });
};
