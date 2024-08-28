import { useFormik } from "formik";
import { productSchema } from "../../schemas/validationSchemas";
import { useEffect } from "react";

export default function ProductForm({ preview, setPreview }) {
  const initialValues = preview || {
    name: "",
    oldPrice: "",
    price: "",
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
    { name: "price", title: "Discount Price", type: "number" },
    { name: "category", title: "Categories (comma separated)", type: "text" },
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
      className="max-w-lg m-auto flex flex-col bg-slate-200 text-slate-900 shadow-md p-5 rounded-md">
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
        className="bg-slate-500 hover:opacity-90 text-white p-2 rounded-md mt-5 h-fit">
        Show Preview
      </button>
    </form>
  );
}
