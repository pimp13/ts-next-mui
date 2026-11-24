import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ExpensesPage } from "@/features/bms/components/expenses-page";

export default function Page() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
          <CircularProgress />
        </Box>
      }
    >
      <ExpensesPage />
    </Suspense>
  );
}
