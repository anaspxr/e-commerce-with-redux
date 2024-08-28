import { axiosPrivate } from "../../utils/axios";

const addNewProduct = async (values, axiosPrivate) => {
  const category = values.category.split(",").map((cat) => cat.trim());
  try {
    const { data } = await axiosPrivate.post("/admin/product", {
      ...values,
      category,
    });
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateProduct = async (productId, values, axiosPrivate) => {
  const category = values.category.split(",").map((cat) => cat.trim());
  try {
    const { data } = await axiosPrivate.put(`/admin/product/${productId}`, {
      ...values,
      category,
    });
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteProduct = async (productId) => {
  try {
    await axiosPrivate.delete(`/admin/product/${productId}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { addNewProduct, updateProduct, deleteProduct };
