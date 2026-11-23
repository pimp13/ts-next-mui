import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Funlife MUI",
    template: "%s · Funlife MUI",
  },
  description: "Next.js + Material UI + React Query dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
