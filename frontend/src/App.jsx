import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Products from "./pages/Products";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import ScrollToTop from "./components/ScrollToTop";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import { useEffect } from "react";
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";
import Admin from "./Admin/AdminHome";
import ProductsPage from "./Admin/ProductsPage";
import UsersPage from "./Admin/UsersPage";
import AdminContainer from "./Admin/AdminContainer";
import ProductEditPage from "./Admin/ProductEditPage";
import ProductContextProvider from "./contexts/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { checkLocalUser, setRedirectPath } from "./Store/userSlice";
import { getServerCart } from "./Store/cartSlice";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProductContextProvider>
        <BrowserRouter>
          <ContentsWrapper />
        </BrowserRouter>
      </ProductContextProvider>
    </div>
  );
}

function ContentsWrapper() {
  const location = useLocation();
  const isAdminPage = location.pathname.includes("/admin");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(checkLocalUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getServerCart(currentUser.id));
    }
  }, [currentUser, dispatch]);

  return (
    <>
      {!isAdminPage ? (
        // If not an admin page, render the normal app
        <>
          <Navbar />
          <div className="md:pt-24 pt-16 "></div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products">
              <Route index element={<Products category="furniture" />} />
              <Route
                path="homedecor"
                element={<Products category="homedecor" />}
              />
              <Route path="sofas" element={<Products category="sofas" />} />
              <Route
                path="mattresses"
                element={<Products category="mattresses" />}
              />
              <Route path="dining" element={<Products category="dining" />} />
              <Route
                path="lightings"
                element={<Products category="lightings" />}
              />
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
          <Footer />
        </>
      ) : (
        // If on admin page, render the admin page with admin navbar
        <AdminContainer>
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
        </AdminContainer>
      )}
      <ScrollToTop />
      <ScrollToHashElement />
    </>
  );
}

function PrivateRoutes({ adminOnly = false }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    if (!currentUser) {
      dispatch(setRedirectPath(location.pathname));
    }
  }, [currentUser, dispatch, location.pathname]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default App;
