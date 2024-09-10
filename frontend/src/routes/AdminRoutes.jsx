import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Admin from "../Admin/pages/AdminHome";
import ProductsPage from "../Admin/pages/ProductsPage";
import ProductEditPage from "../Admin/pages/ProductEditPage";
import UsersPage from "../Admin/pages/UsersPage";
import OrdersPage from "../Admin/pages/OrdersPage";
import UserDetails from "../Admin/components/UserDetails";
import NotFoundPage from "../pages/NotFoundPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes adminOnly />}>
        <Route path="/admin">
          <Route index element={<Admin />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductEditPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
