import { createContext } from "react";
import useFetch from "../utils/useFetch";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const {
    data: products,
    loading,
    error,
  } = useFetch("http://localhost:3000/products");
  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}
