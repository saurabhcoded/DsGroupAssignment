import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const AdminRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;

