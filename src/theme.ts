"use client";

import { createTheme } from "@mui/material/styles";
import { faIR as coreFaIR } from "@mui/material/locale";
import { faIR as dataGridFaIR } from "@mui/x-data-grid/locales";

/**
 * Modern product palette:
 * ink + sky accent, cool neutrals, soft surfaces.
 */
const theme = createTheme(
  {
    direction: "rtl",
    cssVariables: {
      colorSchemeSelector: "data-mui-color-scheme",
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: "#0B6BCB",
            light: "#3B8FE0",
            dark: "#084F98",
            contrastText: "#FFFFFF",
          },
          secondary: {
            main: "#5B6575",
            light: "#8A93A1",
            dark: "#3D4552",
            contrastText: "#FFFFFF",
          },
          background: {
            default: "#F5F7FA",
            paper: "#FFFFFF",
          },
          text: {
            primary: "#121826",
            secondary: "#5C667A",
          },
          divider: "rgba(18, 24, 38, 0.10)",
          success: {
            main: "#159A6A",
          },
          warning: {
            main: "#D97706",
          },
          error: {
            main: "#DC2626",
          },
          info: {
            main: "#0B6BCB",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: "#4DA3FF",
            light: "#7CBCFF",
            dark: "#2B7FD6",
            contrastText: "#041018",
          },
          secondary: {
            main: "#9AA4B5",
            light: "#C2C9D4",
            dark: "#6F7A8C",
            contrastText: "#0A0F18",
          },
          background: {
            default: "#0A0F18",
            paper: "#121A27",
          },
          text: {
            primary: "#EDF2F7",
            secondary: "#9AA4B5",
          },
          divider: "rgba(237, 242, 247, 0.10)",
          success: {
            main: "#34D399",
          },
          warning: {
            main: "#FBBF24",
          },
          error: {
            main: "#F87171",
          },
          info: {
            main: "#4DA3FF",
          },
        },
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: ["IranSans", "Tahoma", "Arial", "sans-serif"].join(","),
      h1: { fontWeight: 700, letterSpacing: "-0.03em" },
      h2: { fontWeight: 700, letterSpacing: "-0.02em" },
      h3: { fontWeight: 600, letterSpacing: "-0.02em" },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
          color: "inherit",
        },
        styleOverrides: {
          root: {
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundImage: "none",
            backdropFilter: "blur(10px)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  },
  coreFaIR,
  dataGridFaIR,
);

export default theme;
