import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { UsersManagement } from "@/features/users/components/users-management";

function ManagementFallback() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
      <CircularProgress />
    </Box>
  );
}

export default function DashboardUsersPage() {
  return (
    <Suspense fallback={<ManagementFallback />}>
      <UsersManagement />
    </Suspense>
  );
}
