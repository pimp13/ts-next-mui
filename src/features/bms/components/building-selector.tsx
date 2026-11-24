"use client";

import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useBuildingContext } from "@/features/bms/hooks/use-building-context";

export function BuildingSelector() {
  const { buildings, buildingId, selectBuilding, isLoading, isError } =
    useBuildingContext();

  if (isError) {
    return (
      <Alert severity="warning">
        بارگذاری ساختمان‌ها ناموفق بود. وارد شوید و مطمئن شوید API روی پورت ۳۰۰۰
        در حال اجراست.
      </Alert>
    );
  }

  if (!isLoading && buildings.length === 0) {
    return (
      <Alert severity="info">
        هنوز ساختمانی ثبت نشده. از صفحه «ساختمان‌ها» یک مجتمع بسازید.
      </Alert>
    );
  }

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        select
        label="ساختمان فعال"
        size="small"
        value={buildingId}
        onChange={(event) => selectBuilding(event.target.value)}
        sx={{ minWidth: 280 }}
        disabled={isLoading || buildings.length === 0}
      >
        {buildings.map((building) => (
          <MenuItem key={building.id} value={building.id}>
            {building.name}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
