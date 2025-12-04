import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import AdminRoute from "./AdminRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Tasks from "../pages/dashboard/Tasks";
import Users from "../pages/dashboard/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "tasks", element: <Tasks /> },
          {
            element: <AdminRoute />,
            children: [
              { path: "users", element: <Users /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
