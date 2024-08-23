import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import { axiosPrivate } from "../utils/axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const user = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      // ? this function will be called before every request
      (config) => {
        if (!config.headers["token"]) {
          config.headers["token"] = `Bearer ${user?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      // ? this function will be called before every successful response
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["token"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
