"use client";

import type { ReactNode } from "react";
import { ThemeRegistry } from "@/components/ThemeRegistry";
import { QueryProvider } from "@/components/providers/query-provider";
import { AppSnackbarProvider } from "@/components/providers/snackbar-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeRegistry>
      <QueryProvider>
        <AppSnackbarProvider>{children}</AppSnackbarProvider>
      </QueryProvider>
    </ThemeRegistry>
  );
}
