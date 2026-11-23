import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";

function OverviewFallback() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: 240 }}>
      <CircularProgress />
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<OverviewFallback />}>
      <DashboardOverview />
    </Suspense>
  );
}
