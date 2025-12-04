import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#646cff",
      light: "#858bff",
      dark: "#535bf2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#764ba2",
      light: "#9b6fc4",
      dark: "#5a3a7d",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#213547",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: "'Lato', sans-serif",
    h1: {
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 600,
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 12px rgba(100, 108, 255, 0.3)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 500,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f8fafc",
          "& .MuiTableCell-head": {
            fontWeight: 600,
            color: "#475569",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#e2e8f0",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
