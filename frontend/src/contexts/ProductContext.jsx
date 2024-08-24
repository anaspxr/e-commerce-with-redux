import { createContext } from "react";
import useFetch from "../utils/useFetch.js";

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/public/products"
  );

  return (
    <ProductContext.Provider
      value={{ products: data?.products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}
