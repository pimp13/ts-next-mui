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
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import {
  useBuildings,
  useCreateBuilding,
} from "@/features/bms/hooks/use-bms";
import {
  chargeFormulaLabel,
  formatMoney,
  type Building,
  type ChargeFormula,
} from "@/features/bms/types";

type FormValues = {
  name: string;
  address: string;
  chargeFormula: ChargeFormula;
  fixedFeePerUnit: number;
  feePerSqm: number;
  lateFeePercent: number;
};

export function BuildingsPage() {
  const buildingsQuery = useBuildings();
  const createMutation = useCreateBuilding();
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      address: "",
      chargeFormula: "HYBRID",
      fixedFeePerUnit: 2_000_000,
      feePerSqm: 50_000,
      lateFeePercent: 5,
    },
  });

  const columns: GridColDef<Building>[] = [
    { field: "name", headerName: "نام", flex: 1, minWidth: 160 },
    { field: "address", headerName: "آدرس", flex: 1.2, minWidth: 200 },
    {
      field: "chargeFormula",
      headerName: "فرمول شارژ",
      width: 140,
      valueGetter: (_v, row) => chargeFormulaLabel[row.chargeFormula],
    },
    {
      field: "fixedFeePerUnit",
      headerName: "ثابت واحد",
      width: 140,
      valueGetter: (_v, row) => formatMoney(row.fixedFeePerUnit),
    },
    {
      field: "unitCount",
      headerName: "واحدها",
      width: 100,
      valueGetter: (_v, row) => row.unitCount ?? "—",
    },
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
        spacing={2}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            ساختمان‌ها
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            تعریف مجتمع و قوانین شارژ
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          ساختمان جدید
        </Button>
      </Stack>

      <Box sx={{ height: 480, width: "100%" }}>
        <DataGrid
          rows={buildingsQuery.data ?? []}
          columns={columns}
          loading={buildingsQuery.isLoading}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>ایجاد ساختمان</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="building-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={form.handleSubmit((values) => {
              createMutation.mutate(
                {
                  ...values,
                  fixedFeePerUnit: Number(values.fixedFeePerUnit),
                  feePerSqm: Number(values.feePerSqm),
                  lateFeePercent: Number(values.lateFeePercent),
                },
                { onSuccess: () => setOpen(false) },
              );
            })}
          >
            <TextField label="نام مجتمع" fullWidth {...form.register("name")} />
            <TextField label="آدرس" fullWidth {...form.register("address")} />
            <TextField
              select
              label="فرمول شارژ"
              fullWidth
              value={form.watch("chargeFormula")}
              onChange={(e) =>
                form.setValue(
                  "chargeFormula",
                  e.target.value as ChargeFormula,
                )
              }
            >
              <MenuItem value="EQUAL">مساوی</MenuItem>
              <MenuItem value="BY_AREA">بر اساس متراژ</MenuItem>
              <MenuItem value="HYBRID">ترکیبی</MenuItem>
            </TextField>
            <TextField
              label="مبلغ ثابت هر واحد (ریال)"
              type="number"
              fullWidth
              {...form.register("fixedFeePerUnit", { valueAsNumber: true })}
            />
            <TextField
              label="مبلغ هر متر (ریال)"
              type="number"
              fullWidth
              {...form.register("feePerSqm", { valueAsNumber: true })}
            />
            <TextField
              label="جریمه دیرکرد (%)"
              type="number"
              fullWidth
              {...form.register("lateFeePercent", { valueAsNumber: true })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>انصراف</Button>
          <Button
            type="submit"
            form="building-form"
            variant="contained"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "در حال ایجاد..." : "ایجاد"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
