import { Box, Typography, Avatar, IconButton, InputBase } from "@mui/material";
import { Search, Notifications, Menu } from "@mui/icons-material";
import { useAppSelector } from "../../store/hooks";
import { useSidebar } from "../../context/SidebarContext";
import appConstants from "../../_constants/appConstants";

const Navigation = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { toggleSidebar } = useSidebar();

  return (
    <Box
      sx={{
        height: appConstants.headerHeight,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={toggleSidebar} size="small">
          <Menu />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#646cff",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>
              {user?.role}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navigation;
