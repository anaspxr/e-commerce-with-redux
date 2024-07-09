import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Automatically scrolls to top whenever pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);
}
