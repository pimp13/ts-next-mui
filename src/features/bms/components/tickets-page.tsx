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
  useCreateTicket,
  useTickets,
  useUnits,
  useUpdateTicketStatus,
} from "@/features/bms/hooks/use-bms";
import {
  ticketPriorityLabel,
  ticketStatusLabel,
  type ServiceTicket,
  type TicketPriority,
  type TicketStatus,
} from "@/features/bms/types";

export function TicketsPage() {
  const { buildingId } = useBuildingContext();
  const ticketsQuery = useTickets(buildingId);
  const unitsQuery = useUnits(buildingId);
  const createTicket = useCreateTicket(buildingId);
  const updateStatus = useUpdateTicketStatus(buildingId);
  const [open, setOpen] = useState(false);
  const form = useForm<{
    title: string;
    description: string;
    unitId: string;
    priority: TicketPriority;
  }>({
    defaultValues: {
      title: "",
      description: "",
      unitId: "",
      priority: "MEDIUM",
    },
  });

  const columns: GridColDef<ServiceTicket>[] = [
    { field: "title", headerName: "عنوان", flex: 1, minWidth: 160 },
    {
      field: "unit",
      headerName: "واحد",
      width: 100,
      valueGetter: (_v, row) => row.unit?.number ?? "—",
    },
    {
      field: "priority",
      headerName: "اولویت",
      width: 110,
      valueGetter: (_v, row) => ticketPriorityLabel[row.priority],
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 140,
      renderCell: (params) => (
        <Chip
          size="small"
          label={ticketStatusLabel[params.row.status]}
          color={
            params.row.status === "DONE"
              ? "success"
              : params.row.status === "OPEN"
                ? "warning"
                : "default"
          }
        />
      ),
    },
    {
      field: "actions",
      headerName: "تغییر وضعیت",
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <TextField
          select
          size="small"
          value={params.row.status}
          onChange={(e) =>
            updateStatus.mutate({
              ticketId: params.row.id,
              status: e.target.value as TicketStatus,
            })
          }
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="OPEN">باز</MenuItem>
          <MenuItem value="IN_PROGRESS">در حال انجام</MenuItem>
          <MenuItem value="DONE">انجام‌شده</MenuItem>
          <MenuItem value="CANCELLED">لغو</MenuItem>
        </TextField>
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
            درخواست‌ها
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            تعمیرات و خدمات ساختمان
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!buildingId}
          onClick={() => setOpen(true)}
        >
          درخواست جدید
        </Button>
      </Stack>

      <Box sx={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={ticketsQuery.data ?? []}
          columns={columns}
          loading={ticketsQuery.isLoading}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>ثبت درخواست</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="ticket-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={form.handleSubmit((values) => {
              createTicket.mutate(
                {
                  title: values.title,
                  description: values.description,
                  unitId: values.unitId || undefined,
                  priority: values.priority,
                },
                { onSuccess: () => setOpen(false) },
              );
            })}
          >
            <TextField label="عنوان" fullWidth {...form.register("title")} />
            <TextField
              label="توضیحات"
              fullWidth
              multiline
              minRows={3}
              {...form.register("description")}
            />
            <TextField
              select
              label="واحد (اختیاری)"
              fullWidth
              value={form.watch("unitId")}
              onChange={(e) => form.setValue("unitId", e.target.value)}
            >
              <MenuItem value="">بدون واحد</MenuItem>
              {(unitsQuery.data ?? []).map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>
                  واحد {unit.number}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="اولویت"
              fullWidth
              value={form.watch("priority")}
              onChange={(e) =>
                form.setValue("priority", e.target.value as TicketPriority)
              }
            >
              <MenuItem value="LOW">کم</MenuItem>
              <MenuItem value="MEDIUM">متوسط</MenuItem>
              <MenuItem value="HIGH">بالا</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>انصراف</Button>
          <Button type="submit" form="ticket-form" variant="contained">
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
