import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm.jsx";
import axios from "../../utils/axios.js";
import {
  addNewProduct,
  updateProduct,
} from "../adminUtils/productOperations.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { toast } from "react-toastify";

export default function ProductEditPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (id === "addproduct") {
      setShowForm(true);
    } else {
      setLoading(true);
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`/public/products/${id}`);
          setPreview({
            ...data.product,
            category: data.product.category.join(", "),
          });
          setShowForm(true);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  async function handleFinalSubmit() {
    if (id === "addproduct") {
      const result = await addNewProduct(preview, axiosPrivate);
      if (result) {
        setPreview(null);
        toast.success("Product added successfully");
      } else {
        toast.error("Failed to add product");
      }
    } else {
      const result = await updateProduct(id, preview, axiosPrivate);
      if (result) {
        setPreview(null);
        toast.success("Product updated successfully");
      } else {
        toast.error("Failed to update product");
      }
    }
  }

  return (
    <div>
      <p className="font-semibold text-2xl my-3 text-center">
        {id === "addproduct" ? "ADD NEW PRODUCT" : "EDIT PRODUCT"}
      </p>
      {loading && <p>Loading...</p>}
      {error && <p>network error..</p>}
      <div className={`grid lg:${preview && "grid-cols-2"} gap-2 items-center`}>
        <div>
          {showForm && (
            <ProductForm preview={preview} setPreview={setPreview} />
          )}
        </div>
        {preview && (
          <div id="preview">
            <div className="flex flex-col items-center bg-slate-200 my-2 p-2 rounded-md">
              <p className="text-xl">Preview</p>
              <div className=" h-64 bg-slate-100 shadow-md rounded-md">
                <img
                  src={preview.image}
                  alt="product image"
                  className="object-cover w-full h-full rounded-md"
                />
              </div>

              <p className="text-lg">{preview.name}</p>
              <p className="text-lg">₹{preview.price}</p>
              <p>Old Price: ₹{preview.oldPrice}</p>
              <p>Category: {preview.category}</p>
              <p>Description: {preview.description}</p>

              <button
                onClick={handleFinalSubmit}
                className="bg-slate-500 hover:opacity-90 text-white p-2 rounded-md my-3 h-fit">
                {id === "addproduct"
                  ? "Confirm Add Product"
                  : "Confirm Update Product"}
              </button>
            </div>
          </div>
        )}
      </div>
      {!showForm && !loading && !error && (
        <p className="text-center">Not found!!</p>
      )}
    </div>
  );
}
