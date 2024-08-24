import { useDispatch } from "react-redux";
import { setWholeCart } from "../Store/cartSlice";
import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useCartUtil = (util) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const utilFunction = async (productData) => {
    setLoading(true);
    setError(null); // Reset error state before the operation

    try {
      const res = await util(productData, axiosPrivate);
      if (res?.newCart) {
        dispatch(setWholeCart(res.newCart)); // Update the cart in the Redux store
      } else if (res?.error) {
        setError(res.error); // Handle any errors returned from the response
      }
    } catch (err) {
      setError(err.message || "An error occurred during the operation.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { utilFunction, loading, error };
};

export default useCartUtil;
