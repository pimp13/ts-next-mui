"use client";

import type { ReactNode } from "react";
import { SnackbarProvider } from "notistack";

export function AppSnackbarProvider({ children }: { children: ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={4}
      autoHideDuration={3200}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {children}
    </SnackbarProvider>
  );
}
