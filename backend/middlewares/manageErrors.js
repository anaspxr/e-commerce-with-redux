// eslint-disable-next-line no-unused-vars
const manageErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const status = err.status || "error";
  return res.status(statusCode).json({
    status,
    statusCode,
    message,
  });
};

export default manageErrors;
