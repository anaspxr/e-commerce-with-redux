import { useFormik } from "formik";
import { addressSchema } from "../schemas/validationSchemas";
import { useEffect, useState } from "react";
import useFetch from "../utils/useFetch.js";
import { useSelector } from "react-redux";
import PopUpAlert from "./PopUpAlert";
import LoadingAndError from "./LoadingAndError.jsx";

export default function Address() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [showAlert, setShowAlert] = useState(null);
  const { data, loading, error } = useFetch(
    `http://localhost:3000/users/${currentUser.id}`
  );

  async function updateAddress(value) {
    const response = await fetch(
      `http://localhost:3000/users/${currentUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: value }),
      }
    );
    if (response.ok) {
      setShowAlert({ message: "Address Updated...!" });
    } else {
      setShowAlert({ message: "Error..!" });
    }
  }

  const initialValues = {
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    handleBlur,
    touched,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addressSchema,
    onSubmit: (values) => {
      setEditOpen(false);
      updateAddress(values);
    },
  });

  const fields = ["name", "address", "city", "state", "pincode", "phone"];

  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setValues(data.address);
    }
  }, [data, setValues]);

  return (
    <div>
      <h1 className="text-xl text-center text-orange-900">Address</h1>
      <LoadingAndError loading={loading} error={error} />
      {data && (
        <div className="m-auto max-w-3xl p-2">
          <form className="flex flex-col gap-2">
            {fields.map((field) => (
              <div key={field}>
                {editOpen && (
                  <label htmlFor={field}>{field.toUpperCase()}</label>
                )}
                <input
                  disabled={!editOpen}
                  className={`w-full p-2 border rounded-sm ${
                    errors[field] &&
                    touched[field] &&
                    editOpen &&
                    " border border-red-500"
                  }`}
                  id={field}
                  type="text"
                  placeholder={field}
                  name={field}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values[field]}
                />
                {errors[field] && touched[field] && editOpen && (
                  <p className="text-red-500">{errors[field]}</p>
                )}
              </div>
            ))}
          </form>
          <div className="flex gap-2">
            <button
              disabled={!editOpen}
              type="submit"
              onClick={handleSubmit}
              className="bg-orange-500 hover:opacity-90 text-white px-4 py-2 rounded-md mt-5 h-fit disabled:bg-opacity-70 ">
              Update
            </button>
            <button
              onClick={() => {
                if (editOpen) {
                  resetForm();
                }
                setEditOpen(!editOpen);
              }}
              className="bg-orange-500 hover:opacity-90 text-white px-4 py-2 rounded-md mt-5 h-fit">
              {editOpen ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      )}
      {showAlert && (
        <PopUpAlert
          type="alert"
          message={showAlert.message}
          handleConfirm={() => {
            setShowAlert(null);
          }}
        />
      )}
    </div>
  );
}
