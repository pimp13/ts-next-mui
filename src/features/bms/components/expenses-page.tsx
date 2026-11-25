"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { BuildingSelector } from "@/features/bms/components/building-selector";
import { useBuildingContext } from "@/features/bms/hooks/use-building-context";
import {
  useCreateExpense,
  useExpenses,
  useOverview,
} from "@/features/bms/hooks/use-bms";
import { formatMoney, type Expense } from "@/features/bms/types";

export function ExpensesPage() {
  const { buildingId } = useBuildingContext();
  const expensesQuery = useExpenses(buildingId);
  const overviewQuery = useOverview(buildingId);
  const createExpense = useCreateExpense(buildingId);
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
      category: "نگهداری",
      spentAt: new Date().toISOString().slice(0, 10),
      note: "",
    },
  });

  const columns: GridColDef<Expense>[] = [
    { field: "title", headerName: "عنوان", flex: 1, minWidth: 160 },
    { field: "category", headerName: "دسته", width: 130 },
    {
      field: "amount",
      headerName: "مبلغ",
      width: 150,
      valueGetter: (_v, row) => formatMoney(row.amount),
    },
    {
      field: "spentAt",
      headerName: "تاریخ",
      width: 130,
      valueGetter: (_v, row) =>
        new Date(row.spentAt).toLocaleDateString("fa-IR"),
    },
    { field: "note", headerName: "یادداشت", flex: 1, minWidth: 140 },
  ];

  const summary = overviewQuery.data;

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
            هزینه‌ها و صندوق
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            هزینه‌های مشترک و مانده صندوق ساختمان
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!buildingId}
          onClick={() => setOpen(true)}
        >
          هزینه جدید
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                درآمد تأییدشده
              </Typography>
              <Typography variant="h6">
                {summary ? formatMoney(summary.confirmedPayments) : "…"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                مجموع هزینه‌ها
              </Typography>
              <Typography variant="h6">
                {summary ? formatMoney(summary.expenses) : "…"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                مانده صندوق
              </Typography>
              <Typography variant="h6">
                {summary ? formatMoney(summary.balance) : "…"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ height: 420, width: "100%" }}>
        <DataGrid
          rows={expensesQuery.data ?? []}
          columns={columns}
          loading={expensesQuery.isLoading}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>ثبت هزینه</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="expense-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={form.handleSubmit((values) => {
              createExpense.mutate(
                {
                  title: values.title,
                  amount: Number(values.amount),
                  category: values.category,
                  spentAt: values.spentAt,
                  note: values.note || undefined,
                },
                { onSuccess: () => setOpen(false) },
              );
            })}
          >
            <TextField label="عنوان" fullWidth {...form.register("title")} />
            <TextField label="دسته" fullWidth {...form.register("category")} />
            <TextField
              label="مبلغ (ریال)"
              type="number"
              fullWidth
              {...form.register("amount", { valueAsNumber: true })}
            />
            <TextField
              label="تاریخ"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...form.register("spentAt")}
            />
            <TextField label="یادداشت" fullWidth {...form.register("note")} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>انصراف</Button>
          <Button type="submit" form="expense-form" variant="contained">
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
