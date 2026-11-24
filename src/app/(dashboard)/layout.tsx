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
    description: "نمای کلی ساختمان، بدهی‌ها و درخواست‌ها",
  },
  "/dashboard/buildings": {
    title: "ساختمان‌ها",
    description: "مدیریت مجتمع‌ها و تنظیمات شارژ",
  },
  "/dashboard/units": {
    title: "واحدها",
    description: "شماره، متراژ، پارکینگ و وضعیت واحدها",
  },
  "/dashboard/residents": {
    title: "ساکنین و نقش‌ها",
    description: "مالک، مستأجر، مدیر و هیئت‌مدیره",
  },
  "/dashboard/charges": {
    title: "شارژ و صورتحساب",
    description: "دوره‌های شارژ و صورتحساب واحدها",
  },
  "/dashboard/payments": {
    title: "پرداخت‌ها",
    description: "ثبت و تأیید پرداخت شارژ",
  },
  "/dashboard/expenses": {
    title: "هزینه‌ها و صندوق",
    description: "هزینه‌های مشترک و مانده صندوق",
  },
  "/dashboard/tickets": {
    title: "درخواست‌ها",
    description: "تعمیرات و خدمات ساختمان",
  },
  "/dashboard/announcements": {
    title: "اعلان‌ها",
    description: "اطلاعیه‌های ساختمان‌محور",
  },
};

function DashboardLayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? {
    title: "مدیریت ساختمان",
    description: "سامانه مدیریت ساختمان مسکونی",
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
