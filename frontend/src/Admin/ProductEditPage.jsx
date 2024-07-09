import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { productSchema } from "../schemas/validationSchemas";
import { handleAdd, handleEdit } from "../utils/serverUtils";
import useFetch from "../utils/useFetch";
import { useEffect, useState } from "react";
export default function ProductEditPage() {
  const { id } = useParams();
  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:3000/products");

  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (id === "addproduct") {
      setShowForm(true);
    } else if (products) {
      const productFound = products.find((product) => product.id === id);
      if (productFound) {
        setPreview(productFound);
        setShowForm(true);
      }
    }
  }, [id, products]);

  function handleFinalSubmit() {
    if (id === "addproduct") {
      const newProduct = { ...preview, id: Date.now().toString() };
      handleAdd(newProduct, "products");
      setPreview(null);
    } else {
      if (
        JSON.stringify(preview) !==
        JSON.stringify(products.find((product) => product.id === preview.id))
      ) {
        handleEdit(preview, "products", preview.id);
      } else {
        alert("You have not made any changes");
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
              <p className="text-lg">₹{preview.discountPrice}</p>
              <p>Old Price: ₹{preview.oldPrice}</p>
              <p>Category: {preview.category}</p>
              <p>Description: {preview.description}</p>

              <button
                onClick={handleFinalSubmit}
                className="bg-slate-500 hover:opacity-90 text-white p-2 rounded-md my-3 h-fit"
              >
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

function ProductForm({ preview, setPreview }) {
  const initialValues = preview || {
    name: "",
    oldPrice: "",
    discountPrice: "",
    category: "",
    image: "",
    description: "",
  };
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    values,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    onSubmit: (values) => {
      setPreview(values);
      window.scrollTo(0, document.body.scrollHeight);
    },
  });
  const formInputs = [
    { name: "name", title: "Product Name", type: "text" },
    { name: "oldPrice", title: "Old Price", type: "number" },
    { name: "discountPrice", title: "Discount Price", type: "number" },
    { name: "category", title: "Category", type: "text" },
    { name: "image", title: "Image Url", type: "text" },
    { name: "description", title: "Description", type: "text" },
  ];

  useEffect(() => {
    if (preview) {
      setValues(preview);
    }
  }, [preview, setValues]);
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg m-auto flex flex-col bg-slate-200 text-slate-900 shadow-md p-5 rounded-md"
    >
      {formInputs.map((field) => {
        return (
          <div className="flex flex-col" key={field.name}>
            <label htmlFor={field.name}>{field.title}</label>
            <input
              id={field.name}
              name={field.name}
              onBlur={handleBlur}
              value={values[field.name]}
              onChange={handleChange}
              type={field.type}
              className="p-2 border border-slate-400 rounded-md"
            />
            <p className="text-red-600 text-sm">
              {errors[field.name] && touched[field.name] && errors[field.name]}
            </p>
          </div>
        );
      })}
      <button
        type="submit"
        className="bg-slate-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit"
      >
        Show Preview
      </button>
    </form>
  );
}
