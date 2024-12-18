// for manage errors
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err); // for checking whats going on
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something wrong";
  res.status(statusCode).json({ msg: message });
};

module.exports = errorHandlerMiddleware;
