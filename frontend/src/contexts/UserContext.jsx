import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWholeCart } from "../Store/cartSlice";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [redirectPath, setRedirectPath] = useState("/");
  const currentUserExists = JSON.parse(localStorage.getItem("currentUser"));
  const [isAdmin, setIsAdmin] = useState(currentUserExists?.isAdmin || false);
  const [currentUser, setCurrentUser] = useState(currentUserExists || null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      const updateCart = async () => {
        const response = await fetch(
          `http://localhost:3000/users/${currentUser.id}`
        );
        const data = await response.json();
        if (data.cart && Object.keys(data.cart).length > 0)
          dispatch(setWholeCart(data.cart));
      };
      updateCart();
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem("currentUser"));
    if (userExists) {
      setCurrentUser(userExists);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.isAdmin);
    }
  }, [currentUser]);

  function login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
        redirectPath,
        setRedirectPath,
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
