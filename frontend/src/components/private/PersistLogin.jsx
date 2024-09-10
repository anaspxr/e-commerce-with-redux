import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRefreshToken from "../../hooks/useRefreshToken";
import { getServerCart } from "../../Store/cartSlice";
import { BeatLoader } from "react-spinners";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [showWaitMessage, setShowWaitMessage] = useState(false);
  const [waitingTime, setWaitingTime] = useState(60);
  const intervalRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const timeout = setTimeout(() => {
      setShowWaitMessage(true);
      intervalRef.current = setInterval(() => {
        setWaitingTime((prev) => prev - 1);
        if (waitingTime <= 0) {
          clearInterval(intervalRef.current);
        }
      }, 1000);
    }, 3000);

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          clearTimeout(timeout);
          clearInterval(intervalRef.current);
          setShowWaitMessage(false);
          setIsLoading(false);
        }
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(getServerCart(axiosPrivate));
    }
  }, [accessToken]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <BeatLoader color="brown" />
          {showWaitMessage && (
            <>
              <p className="text-center text-gray-500">
                The server must be sleeping.. Please wait while we wake it up!
              </p>
              <p className="text-center text-gray-500">
                Expected time: {waitingTime} seconds..
              </p>
            </>
          )}
        </div>
      ) : (
        <> {children}</>
      )}
    </>
  );
};

export default PersistLogin;
