import { useFormik } from "formik";
import { addressSchema } from "../schemas/validationSchemas";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingAndError from "./LoadingAndError.jsx";
import useGetPrivateData from "../hooks/useGetPrivateData.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import axiosErrorCatch from "../utils/axiosErrorCatch.js";
import { toast } from "react-toastify";

export default function Address({ setAddress }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { data, loading, error } = useGetPrivateData("/user");
  const [updating, setUpdating] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [editOpen, setEditOpen] = useState(false);

  async function updateAddress(value) {
    setUpdating(true);
    const { name, ...address } = value;

    try {
      await axiosPrivate.patch("/user", { name, address });
      setEditOpen(false);
      toast.success("Address updated successfully");
    } catch (error) {
      toast.error(axiosErrorCatch(error));
    } finally {
      setUpdating(false);
    }
  }

  const initialValues = {
    name: currentUser.name,
    flatName: "",
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
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addressSchema,
    onSubmit: (values) => {
      setEditOpen(false);
      if (setAddress) setAddress({ name: values.name, ...data.user.address }); // used in payment section
      updateAddress(values);
    },
  });

  const fields = ["name", "flatName", "city", "state", "pincode", "phone"];

  useEffect(() => {
    if (data?.user?.address) {
      if (setAddress) setAddress({ name: values.name, ...data.user.address }); // used in payment section
      setValues({ name: values.name, ...data.user.address });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {updating ? "Updating..." : "Update"}
            </button>
            <button
              onClick={() => setEditOpen(!editOpen)}
              className="bg-orange-500 hover:opacity-90 text-white px-4 py-2 rounded-md mt-5 h-fit">
              {editOpen ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
