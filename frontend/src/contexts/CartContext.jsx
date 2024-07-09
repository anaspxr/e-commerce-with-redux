import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [buyItems, setBuyItems] = useState({});
  const { currentUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    async function getCartItems() {
      if (currentUser) {
        const response = await fetch(
          `http://localhost:3000/users/${currentUser.id}`
        );
        const data = await response.json();
        setCartItems(data.cart);
      }
    }
    getCartItems();
  }, [currentUser]);

  function addToCart(productID) {
    setCartItems((prev) => {
      if (prev[productID]) {
        return { ...prev, [productID]: prev[productID] + 1 };
      }
      return { ...prev, [productID]: 1 };
    });
  }

  function removeFromCart(productID) {
    setCartItems((prev) => {
      if (prev[productID] === 1) {
        const newCartItems = { ...prev };
        delete newCartItems[productID];
        fetch(`http://localhost:3000/users/${currentUser.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: newCartItems }),
        });
        return newCartItems;
      }
      return { ...prev, [productID]: prev[productID] - 1 };
    });
  }

  useEffect(() => {
    if (!currentUser || Object.keys(cartItems).length === 0) {
      return;
    }
    async function updateCart() {
      await fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cartItems }),
      });
    }
    updateCart();
  }, [cartItems, currentUser]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        buyItems,
        setBuyItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
