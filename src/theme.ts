"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#0F766E",
          light: "#14B8A6",
          dark: "#0D5C56",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#C2410C",
          light: "#EA580C",
          dark: "#9A3412",
          contrastText: "#FFFFFF",
        },
        background: {
          default: "#F4F7F6",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#2DD4BF",
          light: "#5EEAD4",
          dark: "#14B8A6",
          contrastText: "#042F2E",
        },
        secondary: {
          main: "#FB923C",
          light: "#FDBA74",
          dark: "#EA580C",
          contrastText: "#431407",
        },
        background: {
          default: "#0B1412",
          paper: "#121C19",
        },
        text: {
          primary: "#E8F0ED",
          secondary: "#9BB0A7",
        },
        divider: "rgba(232, 240, 237, 0.12)",
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600 },
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
          borderRadius: 16,
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
        },
      },
    },
  },
});

export default theme;
