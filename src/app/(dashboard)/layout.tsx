"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

const pageMeta: Record<string, { title: string; description?: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Operational overview from the Go API",
  },
  "/dashboard/users": {
    title: "Users",
    description: "Create and manage accounts with React Hook Form",
  },
  "/dashboard/articles": {
    title: "Articles",
    description: "Editorial workspace powered by React Query",
  },
};

function DashboardLayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? {
    title: "Dashboard",
    description: "Funlife MUI workspace",
  };

  return (
    <DashboardShell title={meta.title} description={meta.description}>
      {children}
    </DashboardShell>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
          <CircularProgress />
        </Box>
      }
    >
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </Suspense>
  );
}
