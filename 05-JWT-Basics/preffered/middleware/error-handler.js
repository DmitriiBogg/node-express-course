const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
