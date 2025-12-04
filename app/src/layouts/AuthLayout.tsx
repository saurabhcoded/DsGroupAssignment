import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { CheckCircle, Assignment, Group, Dashboard } from "@mui/icons-material";

const features = [
  { icon: <Assignment />, title: "Task Management", desc: "Create, update, and track tasks efficiently" },
  { icon: <Group />, title: "Team Collaboration", desc: "Assign tasks to team members seamlessly" },
  { icon: <Dashboard />, title: "Dashboard Analytics", desc: "Visual overview of your progress" },
  { icon: <CheckCircle />, title: "Priority & Status", desc: "Organize with filters and sorting" },
];

const AuthLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: isMobile ? "column" : "row" }}>
      {isMobile && (
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            p: 3,
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ fontFamily: "'Inter Tight', sans-serif" }}>
            TaskFlow
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Streamline your workflow
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          width: isMobile ? "100%" : "40%",
          flex: isMobile ? 1 : "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 4 },
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Outlet />
        </Box>
      </Box>

      {!isMobile && (
        <Box
          sx={{
            width: "60%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 6,
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              opacity: 0.5,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1, maxWidth: 500 }}>
            <Typography variant="h2" fontWeight={700} mb={2} sx={{ fontFamily: "'Inter Tight', sans-serif" }}>
              TaskFlow
            </Typography>
            <Typography variant="h5" mb={4} sx={{ opacity: 0.9 }}>
              Streamline your workflow and boost productivity
            </Typography>

            <List sx={{ mt: 4 }}>
              {features.map((feature, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                  <ListItemIcon sx={{ color: "white", minWidth: 48 }}>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography fontWeight={600}>{feature.title}</Typography>}
                    secondary={
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                        {feature.desc}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AuthLayout;
