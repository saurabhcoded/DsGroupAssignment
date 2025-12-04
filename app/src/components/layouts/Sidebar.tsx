import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Tooltip } from "@mui/material";
import { Dashboard, Assignment, Logout, People } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { useSidebar } from "../../context/SidebarContext";
import appConstants from "../../_constants/appConstants";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { collapsed } = useSidebar();
  const { user } = useAppSelector((state) => state.auth);

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Tasks", icon: <Assignment />, path: "/tasks" },
    ...(user?.role === "admin" ? [{ text: "Users", icon: <People />, path: "/users" }] : []),
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const sidebarWidth = collapsed ? appConstants.sidebarCollapsedWidth : appConstants.sidebarWidth;

  return (
    <Box
      sx={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        height: "100%",
        bgcolor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease, min-width 0.2s ease",
      }}
    >
      <Box
        sx={{
          height: appConstants.headerHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          px: collapsed ? 0 : 3,
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary"
          sx={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          {collapsed ? "T" : "TaskFlow"}
        </Typography>
      </Box>

      <List sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ px: collapsed ? 1 : 2, mb: 0.5 }}>
            <Tooltip title={collapsed ? item.text : ""} placement="right">
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 1.5 : 2,
                  bgcolor: location.pathname === item.path ? "#f1f5f9" : "transparent",
                  color: location.pathname === item.path ? "#646cff" : "#64748b",
                  "&:hover": {
                    bgcolor: "#f1f5f9",
                    color: "#646cff",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: collapsed ? 0 : 40 }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: collapsed ? 1 : 2, borderTop: "1px solid #e2e8f0" }}>
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 1.5 : 2,
              color: "#64748b",
              "&:hover": { bgcolor: "#fef2f2", color: "#ef4444" },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: collapsed ? 0 : 40 }}>
              <Logout />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }} />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
