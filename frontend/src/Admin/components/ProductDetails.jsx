import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";

export default function ProductDetails({ product }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteProduct = async () => {
    setDeleteLoading(true);
    try {
      await axiosPrivate.delete(`/admin/product/${product._id}`);
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div>
      {isDeleted && (
        <p className="bg-red-500 text-white text-center p-2">
          Product Deleted Successfully
        </p>
      )}
      <div
        key={product._id}
        className="bg-white flex items-center border m-2 justify-between p-1 px-10 rounded-sm shadow-md">
        <div>
          <p className="text-xl font-semibold">{product.name}</p>
          <img
            src={product.image}
            alt="product image"
            className="h-16 object-cover w-28 rounded-sm"
          />
          <p className="text-gray-600">Price: {product.price}</p>
          <p className="text-gray-500">Old Price: {product.oldPrice} </p>
          <p className="text-gray-600">
            Categories: {product.category.join(", ")}{" "}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            to={`/admin/products/${product._id}`}
            className="bg-blue-700 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85">
            Edit <FaRegEdit />
          </Link>
          <button
            onClick={() =>
              confirm("Are you sure to delete this product?") && deleteProduct()
            }
            className="bg-red-700 text-white px-2 py-1 rounded-md flex items-center gap-1 hover:bg-opacity-85">
            {deleteLoading ? "Deleting" : "Delete"} <MdOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
}
