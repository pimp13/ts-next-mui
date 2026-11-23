import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ArticlesManagement } from "@/features/articles/components/articles-management";

function ManagementFallback() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
      <CircularProgress />
    </Box>
  );
}

export default function DashboardArticlesPage() {
  return (
    <Suspense fallback={<ManagementFallback />}>
      <ArticlesManagement />
    </Suspense>
  );
}
