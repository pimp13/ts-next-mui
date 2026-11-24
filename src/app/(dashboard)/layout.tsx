"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

const pageMeta: Record<string, { title: string; description?: string }> = {
  "/dashboard": {
    title: "داشبورد",
    description: "نمای عملیاتی از API گویی",
  },
  "/dashboard/users": {
    title: "کاربران",
    description: "ساخت و مدیریت حساب‌ها با React Hook Form",
  },
  "/dashboard/articles": {
    title: "مقالات",
    description: "فضای ویرایشی مبتنی بر React Query",
  },
};

function DashboardLayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? {
    title: "داشبورد",
    description: "فضای کاری فان‌لایف MUI",
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
