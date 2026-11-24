import type { Metadata } from "next";
import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "ورود",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
          <CircularProgress />
        </Box>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
