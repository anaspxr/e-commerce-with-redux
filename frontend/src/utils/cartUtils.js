import axiosErrorCatch from "./axiosErrorCatch";

export const addToCartUtil = async ({ productID }, axiosPrivate) => {
  try {
    const { data } = await axiosPrivate.post(
      "http://localhost:3000/api/user/cart",
      {
        productID,
        quantity: 1,
      }
    );
    return { newCart: data.products, error: null };
  } catch (err) {
    return { error: axiosErrorCatch(err) };
  }
};

export const quantityPlusUtil = async (
  { productID, quantity },
  axiosPrivate
) => {
  try {
    const { data } = await axiosPrivate.post(
      "http://localhost:3000/api/user/cart",
      {
        productID,
        quantity: quantity + 1,
      }
    );
    return { newCart: data.products, error: null };
  } catch (err) {
    return { error: axiosErrorCatch(err) };
  }
};

export const quantityMinusUtil = async (
  { productID, quantity },
  axiosPrivate
) => {
  try {
    const { data } = await axiosPrivate.post(
      "http://localhost:3000/api/user/cart",
      {
        productID,
        quantity: quantity - 1,
      }
    );
    return { newCart: data.products, error: null };
  } catch (err) {
    return { error: axiosErrorCatch(err) };
  }
};

export const setQuantityUtil = async (
  { productID, quantity },
  axiosPrivate
) => {
  try {
    const { data } = await axiosPrivate.post(
      "http://localhost:3000/api/user/cart",
      {
        productID,
        quantity,
      }
    );
    return { newCart: data.products, error: null };
  } catch (err) {
    return { error: axiosErrorCatch(err) };
  }
};

export const removeFromCartUtil = async ({ productID }, axiosPrivate) => {
  try {
    const { data } = await axiosPrivate.delete(
      "http://localhost:3000/api/user/cart",
      { data: { productID } }
    );
    return { newCart: data.products, error: null };
  } catch (err) {
    return { error: axiosErrorCatch(err) };
  }
};
