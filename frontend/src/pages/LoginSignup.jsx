import { useEffect, useState } from "react";
import Login from "../components/private/Login";
import SignUp from "../components/private/SignUp";
import Alerts from "../components/Alerts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LoginSignup() {
  const [newUser, setNewUser] = useState(false);
  const [alert, setAlert] = useState(null);

  const { currentUser, error, redirectPath } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate(redirectPath === "/login" ? "/" : redirectPath);
    }
  }, [currentUser, navigate, redirectPath]);

  useEffect(() => {
    if (error) {
      setAlert({ type: "warning", message: error });
    }
  }, [error]);

  return (
    <div className="flex justify-center flex-col items-center gap-2 my-5">
      {alert && <Alerts type={alert.type} message={alert.message} />}
      {newUser ? (
        <SignUp setAlert={setAlert} setNewUser={setNewUser} />
      ) : (
        <Login setNewUser={setNewUser} />
      )}
    </div>
  );
}
