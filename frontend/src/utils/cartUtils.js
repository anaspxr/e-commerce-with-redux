import { toast } from "react-toastify";
import axiosErrorCatch from "./axiosErrorCatch";

export const addToCartUtil = async ({ productID }, axiosPrivate) => {
  try {
    const { data } = await axiosPrivate.post("/user/cart", {
      productID,
      quantity: 1,
    });
    return { newCart: data.products, error: null };
  } catch (err) {
    toast.error("Something went wrong, please try again later");
    return { error: axiosErrorCatch(err) };
  }
};

export const quantityPlusUtil = async (
  { productID, quantity },
  axiosPrivate
) => {
  try {
    const { data } = await axiosPrivate.post("/user/cart", {
      productID,
      quantity: quantity + 1,
    });
    return { newCart: data.products, error: null };
  } catch (err) {
    toast.error("Something went wrong, please try again later");
    return { error: axiosErrorCatch(err) };
  }
};

export const quantityMinusUtil = async (
  { productID, quantity },
  axiosPrivate
) => {
  try {
    const { data } = await axiosPrivate.post("/user/cart", {
      productID,
      quantity: quantity - 1,
    });
    return { newCart: data.products, error: null };
  } catch (err) {
    toast.error("Something went wrong, please try again later");
    return { error: axiosErrorCatch(err) };
  }
};

export const setQuantityUtil = async (
  { productID, quantity },
  axiosPrivate
) => {
  try {
    const { data } = await axiosPrivate.post("/user/cart", {
      productID,
      quantity,
    });
    return { newCart: data.products, error: null };
  } catch (err) {
    toast.error("Something went wrong, please try again later");
    return { error: axiosErrorCatch(err) };
  }
};

export const removeFromCartUtil = async ({ productID }, axiosPrivate) => {
  try {
    const { data } = await axiosPrivate.delete("/user/cart", {
      data: { productID },
    });
    return { newCart: data.products, error: null };
  } catch (err) {
    toast.error("Something went wrong, please try again later");
    return { error: axiosErrorCatch(err) };
  }
};
