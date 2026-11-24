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
import { BuildingSelector } from "@/features/bms/components/building-selector";
import { useBuildingContext } from "@/features/bms/hooks/use-building-context";
import {
  useConfirmPayment,
  useCreatePayment,
  usePayments,
  useRejectPayment,
  useUnits,
} from "@/features/bms/hooks/use-bms";
import {
  formatMoney,
  paymentMethodLabel,
  paymentStatusLabel,
  type Payment,
  type PaymentMethod,
} from "@/features/bms/types";

export function PaymentsPage() {
  const { buildingId } = useBuildingContext();
  const paymentsQuery = usePayments(buildingId);
  const unitsQuery = useUnits(buildingId);
  const createPayment = useCreatePayment(buildingId);
  const confirmPayment = useConfirmPayment(buildingId);
  const rejectPayment = useRejectPayment(buildingId);
  const [open, setOpen] = useState(false);
  const form = useForm<{
    unitId: string;
    amount: number;
    method: PaymentMethod;
    note: string;
  }>({
    defaultValues: {
      unitId: "",
      amount: 0,
      method: "TRANSFER",
      note: "",
    },
  });

  const columns: GridColDef<Payment>[] = [
    {
      field: "unit",
      headerName: "واحد",
      width: 100,
      valueGetter: (_v, row) => row.unit?.number ?? "—",
    },
    {
      field: "amount",
      headerName: "مبلغ",
      width: 150,
      valueGetter: (_v, row) => formatMoney(row.amount),
    },
    {
      field: "method",
      headerName: "روش",
      width: 140,
      valueGetter: (_v, row) => paymentMethodLabel[row.method],
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 150,
      renderCell: (params) => (
        <Chip
          size="small"
          label={paymentStatusLabel[params.row.status]}
          color={
            params.row.status === "CONFIRMED"
              ? "success"
              : params.row.status === "REJECTED"
                ? "error"
                : "warning"
          }
        />
      ),
    },
    {
      field: "paidAt",
      headerName: "تاریخ",
      width: 130,
      valueGetter: (_v, row) =>
        new Date(row.paidAt).toLocaleDateString("fa-IR"),
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 200,
      sortable: false,
      renderCell: (params) =>
        params.row.status === "PENDING" ? (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              onClick={() => confirmPayment.mutate(params.row.id)}
            >
              تأیید
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => rejectPayment.mutate(params.row.id)}
            >
              رد
            </Button>
          </Stack>
        ) : null,
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
            پرداخت‌ها
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ثبت فیش و تأیید توسط مدیر
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!buildingId}
          onClick={() => setOpen(true)}
        >
          ثبت پرداخت
        </Button>
      </Stack>

      <Box sx={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={paymentsQuery.data ?? []}
          columns={columns}
          loading={paymentsQuery.isLoading}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>ثبت پرداخت</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="payment-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={form.handleSubmit((values) => {
              createPayment.mutate(
                {
                  unitId: values.unitId,
                  amount: Number(values.amount),
                  method: values.method,
                  note: values.note || undefined,
                },
                { onSuccess: () => setOpen(false) },
              );
            })}
          >
            <TextField
              select
              label="واحد"
              fullWidth
              value={form.watch("unitId")}
              onChange={(e) => form.setValue("unitId", e.target.value)}
            >
              {(unitsQuery.data ?? []).map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>
                  واحد {unit.number}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="مبلغ (ریال)"
              type="number"
              fullWidth
              {...form.register("amount", { valueAsNumber: true })}
            />
            <TextField
              select
              label="روش پرداخت"
              fullWidth
              value={form.watch("method")}
              onChange={(e) =>
                form.setValue("method", e.target.value as PaymentMethod)
              }
            >
              <MenuItem value="CASH">نقد</MenuItem>
              <MenuItem value="CARD">کارت</MenuItem>
              <MenuItem value="TRANSFER">واریز</MenuItem>
              <MenuItem value="OTHER">سایر</MenuItem>
            </TextField>
            <TextField label="یادداشت" fullWidth {...form.register("note")} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>انصراف</Button>
          <Button type="submit" form="payment-form" variant="contained">
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
