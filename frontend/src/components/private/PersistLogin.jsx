/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRefreshToken from "../../hooks/useRefreshToken";
import { getServerCart } from "../../Store/cartSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import axiosErrorCatch from "../../utils/axiosErrorCatch";

export const LoadingContext = createContext();

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        if (!(err.response.status === 401)) {
          toast.error(axiosErrorCatch(err));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!accessToken) {
      toast.promise(verifyRefreshToken(), {
        pending: "Awaiting verification...",
      });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(getServerCart(axiosPrivate));
    }
  }, [accessToken]);

  return (
    <>
      <LoadingContext.Provider value={{ isLoading }}>
        {children}
      </LoadingContext.Provider>
    </>
  );
};

export default PersistLogin;
