import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { TicketsPage } from "@/features/bms/components/tickets-page";

export default function Page() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      }
    >
      <TicketsPage />
    </Suspense>
  );
}
