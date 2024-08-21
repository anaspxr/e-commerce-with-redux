import axios from "axios";
import axiosErrorCatch from "./axiosErrorCatch";

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/refreshtoken",
      {},
      {
        withCredentials: true, // Ensures cookies are included in the request
      }
    );
    return { user: response.data.user, accessToken: response.data.accessToken };
  } catch (error) {
    console.log(axiosErrorCatch(error));
  }
};

export default refreshToken;
