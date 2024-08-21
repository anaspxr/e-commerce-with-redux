import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Admin from "../Admin/AdminHome";
import ProductsPage from "../Admin/ProductsPage";
import ProductEditPage from "../Admin/ProductEditPage";
import UsersPage from "../Admin/UsersPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes adminOnly />}>
        <Route path="/admin">
          <Route index element={<Admin />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductEditPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
