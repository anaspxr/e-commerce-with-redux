// accepts status code and message for error and return the error in standardized format
export const customError = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
