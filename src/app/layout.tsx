import type { Metadata } from "next";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "مدیریت ساختمان",
    template: "%s · مدیریت ساختمان",
  },
  description: "سامانه مدیریت ساختمان مسکونی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          attribute="data-mui-color-scheme"
          defaultMode="system"
          modeStorageKey="funlife-mui-mode"
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
