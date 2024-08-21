import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";
import ProductContextProvider from "./contexts/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./Store/userSlice";
import { getServerCart } from "./Store/cartSlice";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.includes("/admin");
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Refresh token on app load
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    // Fetch cart from server if user is logged in
    if (accessToken) {
      dispatch(getServerCart(accessToken));
    }
  }, [accessToken, dispatch]);
  return (
    <div className="flex flex-col min-h-screen">
      <ProductContextProvider>
        <>
          {!isAdminPage ? (
            // If not an admin page, render the normal app with navbar and footer
            <>
              <Navbar />
              <div className="md:pt-24 pt-16 "></div>
              <UserRoutes />
              <Footer />
            </>
          ) : (
            <AdminRoutes /> // If admin page, render the admin routes
          )}
          <ScrollToTop />
          <ScrollToHashElement />
        </>
      </ProductContextProvider>
    </div>
  );
}
export default App;
