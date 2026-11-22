import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { ThemeRegistry } from "@/components/ThemeRegistry";
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
  description: "Next.js App Router starter with Material UI",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ThemeRegistry>
          <AppShell>{children}</AppShell>
        </ThemeRegistry>
      </body>
    </html>
  );
}
