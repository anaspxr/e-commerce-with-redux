import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../Store/userSlice";
import axiosErrorCatch from "../../utils/axiosErrorCatch";

export default function Login({ setAlert, setNewUser }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/auth/login",
          values,
          { withCredentials: true }
        );
        dispatch(login(data)); //data contains user (user details) and accessToken
      } catch (error) {
        setAlert({
          message: axiosErrorCatch(error),
          type: "warning",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg border p-5 sm:w-[500px] w-5/6 flex flex-col items-center justify-center rounded-lg mb-20">
      <h1 className="text-2xl text-orange-900">Login</h1>
      <div className="w-full my-2">
        <label className="text-orange-900" htmlFor="email">
          EMAIL
        </label>
        <input
          id="email"
          className="w-full p-2 my-2 border rounded-md border-orange-900"
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="w-full my-2">
        <label className="text-orange-900" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          className="w-full p-2 my-2 border rounded-md border-orange-900"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={values.password}
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="bg-orange-700 text-white p-2 rounded-md hover:bg-orange-600 transition duration-300 w-full my-4">
        {loading ? "Loading..." : "Login"}
      </button>
      <p className="text-orange-900">
        Do not have an account?
        <span
          onClick={() => {
            setNewUser(true);
          }}
          className="text-orange-700 underline cursor-pointer hover:text-orange-500">
          Sign up
        </span>
      </p>
    </form>
  );
}
