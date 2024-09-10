import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import PersistLogin from "./components/private/PersistLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Zoom } from "react-toastify";

function App() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isAdminPage = pathSegments[0] === "admin";
  // to check if the current page is an admin page and render the admin navbar

  return (
    <PersistLogin>
      <div className="flex flex-col min-h-screen">
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
        <ToastContainer
          autoClose="2000"
          hideProgressBar
          stacked
          className="toast-position"
          draggable
          transition={Zoom}
        />
        <ScrollToTop />
        <ScrollToHashElement />
      </div>
    </PersistLogin>
  );
}
export default App;
