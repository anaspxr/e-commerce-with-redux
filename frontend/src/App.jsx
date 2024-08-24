import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import PersistLogin from "./components/private/PersistLogin";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <PersistLogin>
      <div className="flex flex-col min-h-screen">
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
      </div>
    </PersistLogin>
  );
}
export default App;
