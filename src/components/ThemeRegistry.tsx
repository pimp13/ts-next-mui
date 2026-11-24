"use client";

import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import theme from "@/theme";

type ThemeRegistryProps = {
  children: ReactNode;
};

export function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <AppRouterCacheProvider
      options={{
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      }}
    >
      <ThemeProvider theme={theme} defaultMode="system" modeStorageKey="funlife-mui-mode">
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
