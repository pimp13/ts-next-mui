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
import {
  useCreatePeriod,
  useInvoices,
  useIssuePeriod,
  usePeriods,
} from "@/features/bms/hooks/use-bms";
import {
  formatMoney,
  invoiceStatusLabel,
  type ChargePeriod,
  type Invoice,
} from "@/features/bms/types";

export function ChargesPage() {
  const { buildingId } = useBuildingContext();
  const periodsQuery = usePeriods(buildingId);
  const invoicesQuery = useInvoices(buildingId);
  const createPeriod = useCreatePeriod(buildingId);
  const issuePeriod = useIssuePeriod(buildingId);
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      label: "شارژ ماه جاری",
      yearMonth: "1404-08",
      dueDate: new Date().toISOString().slice(0, 10),
      notes: "",
    },
  });

  const periodColumns: GridColDef<ChargePeriod>[] = [
    { field: "label", headerName: "عنوان", flex: 1, minWidth: 140 },
    { field: "yearMonth", headerName: "دوره", width: 110 },
    {
      field: "dueDate",
      headerName: "سررسید",
      width: 130,
      valueGetter: (_v, row) =>
        new Date(row.dueDate).toLocaleDateString("fa-IR"),
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 120,
      renderCell: (params) => (
        <Chip
          size="small"
          label={
            params.value === "ISSUED"
              ? "صادر شده"
              : params.value === "CLOSED"
                ? "بسته"
                : "پیش‌نویس"
          }
          color={params.value === "ISSUED" ? "success" : "default"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 140,
      sortable: false,
      renderCell: (params) =>
        params.row.status === "DRAFT" ? (
          <Button
            size="small"
            disabled={issuePeriod.isPending}
            onClick={() => issuePeriod.mutate(params.row.id)}
          >
            صدور شارژ
          </Button>
        ) : null,
    },
  ];

  const invoiceColumns: GridColDef<Invoice>[] = [
    {
      field: "unit",
      headerName: "واحد",
      width: 100,
      valueGetter: (_v, row) => row.unit?.number ?? "—",
    },
    {
      field: "period",
      headerName: "دوره",
      flex: 1,
      valueGetter: (_v, row) => row.period?.label ?? "—",
    },
    {
      field: "amount",
      headerName: "مبلغ",
      width: 140,
      valueGetter: (_v, row) => formatMoney(row.amount),
    },
    {
      field: "paidAmount",
      headerName: "پرداخت‌شده",
      width: 140,
      valueGetter: (_v, row) => formatMoney(row.paidAmount),
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 130,
      renderCell: (params) => (
        <Chip
          size="small"
          label={invoiceStatusLabel[params.row.status]}
          color={
            params.row.status === "PAID"
              ? "success"
              : params.row.status === "OVERDUE"
                ? "error"
                : "default"
          }
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
            شارژ و صورتحساب
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            تعریف دوره و صدور خودکار برای واحدها
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!buildingId}
          onClick={() => setOpen(true)}
        >
          دوره جدید
        </Button>
      </Stack>

      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        دوره‌ها
      </Typography>
      <Box sx={{ height: 280, width: "100%" }}>
        <DataGrid
          rows={periodsQuery.data ?? []}
          columns={periodColumns}
          loading={periodsQuery.isLoading}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        صورتحساب‌ها
      </Typography>
      <Box sx={{ height: 360, width: "100%" }}>
        <DataGrid
          rows={invoicesQuery.data ?? []}
          columns={invoiceColumns}
          loading={invoicesQuery.isLoading}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>دوره شارژ جدید</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="period-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={form.handleSubmit((values) => {
              createPeriod.mutate(values, {
                onSuccess: () => setOpen(false),
              });
            })}
          >
            <TextField label="عنوان" fullWidth {...form.register("label")} />
            <TextField
              label="سال-ماه (مثلاً 1404-08)"
              fullWidth
              {...form.register("yearMonth")}
            />
            <TextField
              label="سررسید"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...form.register("dueDate")}
            />
            <TextField
              label="یادداشت"
              fullWidth
              multiline
              minRows={2}
              {...form.register("notes")}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>انصراف</Button>
          <Button type="submit" form="period-form" variant="contained">
            ایجاد
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
