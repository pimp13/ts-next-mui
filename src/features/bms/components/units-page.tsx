"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { BuildingSelector } from "@/features/bms/components/building-selector";
import { useBuildingContext } from "@/features/bms/hooks/use-building-context";
import { useCreateUnit, useUnits } from "@/features/bms/hooks/use-bms";
import type { Unit } from "@/features/bms/types";

type FormValues = {
  number: string;
  floor: number | null;
  areaSqm: number;
  parkingCount: number;
  storageCount: number;
};

export function UnitsPage() {
  const { buildingId } = useBuildingContext();
  const unitsQuery = useUnits(buildingId);
  const createMutation = useCreateUnit(buildingId);
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      number: "",
      floor: 1,
      areaSqm: 100,
      parkingCount: 1,
      storageCount: 0,
    },
  });

  const columns: GridColDef<Unit>[] = [
    { field: "number", headerName: "شماره واحد", width: 120 },
    { field: "floor", headerName: "طبقه", width: 90 },
    { field: "areaSqm", headerName: "متراژ", width: 100 },
    { field: "parkingCount", headerName: "پارکینگ", width: 100 },
    { field: "storageCount", headerName: "انباری", width: 100 },
    {
      field: "isActive",
      headerName: "وضعیت",
      width: 110,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value ? "فعال" : "غیرفعال"}
          color={params.value ? "success" : "default"}
        />
      ),
    },
  ];

  return (
    <Stack spacing={2.5}>
      <BuildingSelector />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
        spacing={2}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            واحدها
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ساختار فیزیکی ساختمان
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!buildingId}
          onClick={() => setOpen(true)}
        >
          واحد جدید
        </Button>
      </Stack>

      <Box sx={{ height: 480, width: "100%" }}>
        <DataGrid
          rows={unitsQuery.data ?? []}
          columns={columns}
          loading={unitsQuery.isLoading}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>ایجاد واحد</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="unit-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={form.handleSubmit((values) => {
              createMutation.mutate(
                {
                  number: values.number,
                  floor: values.floor,
                  areaSqm: Number(values.areaSqm),
                  parkingCount: Number(values.parkingCount),
                  storageCount: Number(values.storageCount),
                },
                { onSuccess: () => setOpen(false) },
              );
            })}
          >
            <TextField label="شماره واحد" fullWidth {...form.register("number")} />
            <TextField
              label="طبقه"
              type="number"
              fullWidth
              {...form.register("floor", { valueAsNumber: true })}
            />
            <TextField
              label="متراژ"
              type="number"
              fullWidth
              {...form.register("areaSqm", { valueAsNumber: true })}
            />
            <TextField
              label="تعداد پارکینگ"
              type="number"
              fullWidth
              {...form.register("parkingCount", { valueAsNumber: true })}
            />
            <TextField
              label="تعداد انباری"
              type="number"
              fullWidth
              {...form.register("storageCount", { valueAsNumber: true })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>انصراف</Button>
          <Button
            type="submit"
            form="unit-form"
            variant="contained"
            disabled={createMutation.isPending}
          >
            ایجاد
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
