import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Admin from "../Admin/pages/AdminHome";
import ProductsPage from "../Admin/pages/ProductsPage";
import ProductEditPage from "../Admin/pages/ProductEditPage";
import UsersPage from "../Admin/pages/UsersPage";
import AdminContainer from "../Admin/components/AdminContainer";
import OrdersPage from "../Admin/pages/OrdersPage";

export default function AdminRoutes() {
  return (
    <AdminContainer>
      <Routes>
        <Route element={<PrivateRoutes adminOnly />}>
          <Route path="/admin">
            <Route index element={<Admin />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductEditPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
        </Route>
      </Routes>
    </AdminContainer>
  );
}
