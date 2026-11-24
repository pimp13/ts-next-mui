import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const vazirmatn = Vazirmatn({
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: {
    default: "فان‌لایف MUI",
    template: "%s · فان‌لایف MUI",
  },
  description: "داشبورد Next.js + Material UI + React Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${vazirmatn.className}`}
      suppressHydrationWarning
    >
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
