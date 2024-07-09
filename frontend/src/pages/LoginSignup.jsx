import { useContext, useEffect, useState } from "react";
import Login from "../components/private/Login";
import SignUp from "../components/private/SignUp";
import Alerts from "../components/Alerts";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function LoginSignup() {
  const [newUser, setNewUser] = useState(false);
  const [alert, setAlert] = useState(null);
  const { currentUser, redirectPath } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate(redirectPath);
    }
  }, [currentUser, navigate, redirectPath]);
  return (
    <div className="flex justify-center flex-col items-center gap-2 my-5">
      {alert && <Alerts type={alert.type} message={alert.message} />}
      {newUser ? (
        <SignUp setAlert={setAlert} setNewUser={setNewUser} />
      ) : (
        <Login setAlert={setAlert} setNewUser={setNewUser} />
      )}
    </div>
  );
}
