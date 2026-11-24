import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { BmsOverview } from "@/features/bms/components/bms-overview";

function Fallback() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: 240 }}>
      <CircularProgress />
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <BmsOverview />
    </Suspense>
  );
}
