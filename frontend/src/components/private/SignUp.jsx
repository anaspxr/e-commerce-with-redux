import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/validationSchemas";
import axios from "axios";
import axiosErrorCatch from "../../utils/axiosErrorCatch";

export default function SignUp({ setAlert, setNewUser }) {
  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, actions) => {
      try {
        // make a newUser object to send to the server
        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        await axios.post("http://localhost:3000/api/auth/register", newUser);

        actions.resetForm();
        setAlert({
          flag: true,
          message: "User created successfully",
          type: "success",
        });
        setNewUser(false);
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      } catch (error) {
        setAlert({
          message: axiosErrorCatch(error),
          type: "warning",
        });
      }
    },
  });
  const fields = ["name", "email", "password", "confirm"];
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg border p-5 sm:w-[500px] w-5/6 flex flex-col items-center justify-center rounded-lg mb-20">
      <h1 className="text-orange-900 text-3xl">Sign Up</h1>
      {fields.map((field) => (
        <div key={field} className="w-full my-2">
          <label className="text-orange-800" htmlFor={field}>
            {field.toUpperCase()}
          </label>
          <input
            id={field}
            className={`w-full p-2 my-2 border rounded-md border-orange-900 ${
              errors[field] && touched[field] && "border border-red-500 "
            }`}
            type={
              field === "email"
                ? "email"
                : field === "name"
                ? "text"
                : "password"
            }
            placeholder={field === "confirm" ? "Confirm Password" : field}
            name={field}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[field]}
          />
          {errors[field] && touched[field] && (
            <p className="text-red-500">{errors[field]}</p>
          )}
        </div>
      ))}

      <button
        disabled={isSubmitting}
        className={`${
          isSubmitting ? "bg-opacity-50" : ""
        }bg-orange-700 text-white p-2 rounded-md
           hover:bg-orange-600 transition duration-300 w-full my-4`}
        type="submit">
        {isSubmitting ? "Loading..." : "Sign Up"}
      </button>
      <p className="text-orange-900">
        Already have an account?{" "}
        <span
          onClick={() => {
            setAlert(null);
            setNewUser(false);
          }}
          className="text-orange-700 underline cursor-pointer hover:text-orange-500">
          Login
        </span>
      </p>
    </form>
  );
}
