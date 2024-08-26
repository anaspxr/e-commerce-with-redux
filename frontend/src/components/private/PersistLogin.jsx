import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRefreshToken from "../../hooks/useRefreshToken";
import { getServerCart, setWishlist } from "../../Store/cartSlice";
import { BeatLoader } from "react-spinners";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
      axiosPrivate.get("/user/wishlist").then((res) => {
        dispatch(setWishlist(res.data.products));
      });

      dispatch(getServerCart(axiosPrivate));
    }
  }, [accessToken, axiosPrivate, dispatch]);

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
