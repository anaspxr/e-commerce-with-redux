// used to handle errors from axios requests catch block
const axiosErrorCatch = (error) => {
  let errorMessage = "";
  if (error.response) {
    errorMessage = error.response.data?.message || "Server error";
  } else if (error.request) {
    // request was made but no response was received
    errorMessage = "No response from server. Please try again later.";
  } else {
    // something else happened
    errorMessage = "Error: " + error.message;
  }
  return errorMessage;
};

export default axiosErrorCatch;
