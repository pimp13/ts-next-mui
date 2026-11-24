import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { BuildingsPage } from "@/features/bms/components/buildings-page";

export default function Page() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      }
    >
      <BuildingsPage />
    </Suspense>
  );
}
