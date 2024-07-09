import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useFormik } from "formik";

export default function Login({ setAlert, setNewUser }) {
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const users = await response.json();
        const user = users.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );
        if (user) {
          login({
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            id: user.id,
          });
        } else {
          setAlert({ message: "Invalid credentials", type: "warning" });
        }
      } catch (error) {
        setAlert({
          message: "Failed to fetch" + error.message,
          type: "warning",
        });
        setLoading(false);
      }
      setLoading(false);

      // const localData = JSON.parse(localStorage.getItem("users")) || {};
      // const userExists =
      //   localData[values.email]?.password === values.password ||
      //   (values.email === "comfortcraftadmin@gmail.com" &&
      //     values.password === "comfortcraft");
      // if (userExists) {
      //   login(values.email);
      // } else {
      //   setAlert({ message: "Invalid credentials", type: "warning" });
      // }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg border p-5 sm:w-[500px] w-5/6 flex flex-col items-center justify-center rounded-lg mb-20"
    >
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
        className="bg-orange-700 text-white p-2 rounded-md hover:bg-orange-600 transition duration-300 w-full my-4"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <p className="text-orange-900">
        Do not have an account?
        <span
          onClick={() => {
            setNewUser(true);
          }}
          className="text-orange-700 underline cursor-pointer hover:text-orange-500"
        >
          Sign up
        </span>
      </p>
    </form>
  );
}
