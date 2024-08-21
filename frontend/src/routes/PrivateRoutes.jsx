import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setRedirectPath } from "../Store/userSlice";
import AdminContainer from "../Admin/AdminContainer";

export default function PrivateRoutes({ adminOnly = false }) {
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

  if (adminOnly) {
    return isAdmin ? (
      <AdminContainer>
        <Outlet />
      </AdminContainer>
    ) : (
      <Navigate to="/" />
    );
  }

  return <Outlet />;
}
