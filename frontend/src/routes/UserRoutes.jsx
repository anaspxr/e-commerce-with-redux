import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Product from "../pages/Product";
import LoginSignup from "../pages/LoginSignup";
import SearchResults from "../pages/SearchResults";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Checkout from "../pages/Checkout";
import PrivateRoutes from "./PrivateRoutes";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products">
        <Route index element={<Products category="furniture" />} />
        <Route path="homedecor" element={<Products category="homedecor" />} />
        <Route path="sofas" element={<Products category="sofas" />} />
        <Route path="mattresses" element={<Products category="mattresses" />} />
        <Route path="dining" element={<Products category="dining" />} />
        <Route path="lightings" element={<Products category="lightings" />} />
        <Route
          path="furnishings"
          element={<Products category="furnishings" />}
        />
        <Route path=":productID" element={<Product />} />
      </Route>
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}
