import { Box } from "@mui/material";
import Sidebar from "../components/layouts/Sidebar";
import Navigation from "../components/layouts/Navigation";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../context/SidebarContext";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Navigation />
          <Box sx={{ flex: 1, overflow: "auto", bgcolor: "#f8fafc" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </SidebarProvider>
  );
};

export default DashboardLayout;
