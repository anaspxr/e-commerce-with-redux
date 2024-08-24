import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRefreshToken from "../../hooks/useRefreshToken";
import { getServerCart } from "../../Store/cartSlice";
import { BeatLoader } from "react-spinners";

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const refresh = useRefreshToken();
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    // Fetch cart from server if user is logged in
    if (accessToken) {
      dispatch(getServerCart(accessToken));
    }
  }, [accessToken, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="brown" />
        </div>
      ) : (
        <> {children}</>
      )}
    </>
  );
};

export default PersistLogin;
