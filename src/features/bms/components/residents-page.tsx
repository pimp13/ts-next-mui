"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { BuildingSelector } from "@/features/bms/components/building-selector";
import { useBuildingContext } from "@/features/bms/hooks/use-building-context";
import {
  useAddMember,
  useAddOccupancy,
  useMembers,
  useOccupancies,
  useUnits,
} from "@/features/bms/hooks/use-bms";
import {
  memberRoleLabel,
  occupancyTypeLabel,
  type BuildingMemberRole,
  type BuildingMembership,
  type OccupancyType,
  type UnitOccupancy,
} from "@/features/bms/types";

export function ResidentsPage() {
  const { buildingId } = useBuildingContext();
  const [tab, setTab] = useState(0);
  const membersQuery = useMembers(buildingId);
  const occupanciesQuery = useOccupancies(buildingId);
  const unitsQuery = useUnits(buildingId);
  const addMember = useAddMember(buildingId);
  const addOccupancy = useAddOccupancy(buildingId);
  const [memberOpen, setMemberOpen] = useState(false);
  const [occOpen, setOccOpen] = useState(false);

  const memberForm = useForm<{ email: string; role: BuildingMemberRole }>({
    defaultValues: { email: "", role: "RESIDENT" },
  });
  const occForm = useForm<{
    email: string;
    unitId: string;
    type: OccupancyType;
  }>({
    defaultValues: { email: "", unitId: "", type: "OWNER" },
  });

  const memberColumns: GridColDef<BuildingMembership>[] = [
    {
      field: "name",
      headerName: "نام",
      flex: 1,
      valueGetter: (_v, row) => row.user?.name ?? "—",
    },
    {
      field: "email",
      headerName: "ایمیل",
      flex: 1,
      valueGetter: (_v, row) => row.user?.email ?? "—",
    },
    {
      field: "role",
      headerName: "نقش",
      width: 160,
      valueGetter: (_v, row) => memberRoleLabel[row.role],
    },
  ];

  const occColumns: GridColDef<UnitOccupancy>[] = [
    {
      field: "unit",
      headerName: "واحد",
      width: 120,
      valueGetter: (_v, row) => row.unit?.number ?? "—",
    },
    {
      field: "name",
      headerName: "نام",
      flex: 1,
      valueGetter: (_v, row) => row.user?.name ?? "—",
    },
    {
      field: "email",
      headerName: "ایمیل",
      flex: 1,
      valueGetter: (_v, row) => row.user?.email ?? "—",
    },
    {
      field: "type",
      headerName: "نوع",
      width: 120,
      valueGetter: (_v, row) => occupancyTypeLabel[row.type],
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
            ساکنین و نقش‌ها
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            عضویت ساختمان و اتصال به واحد
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            disabled={!buildingId}
            onClick={() => setMemberOpen(true)}
          >
            افزودن عضو
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disabled={!buildingId}
            onClick={() => setOccOpen(true)}
          >
            اتصال به واحد
          </Button>
        </Stack>
      </Stack>

      <Tabs value={tab} onChange={(_e, value) => setTab(value)}>
        <Tab label="اعضای ساختمان" />
        <Tab label="اشغال واحدها" />
      </Tabs>

      {tab === 0 ? (
        <Box sx={{ height: 420, width: "100%" }}>
          <DataGrid
            rows={membersQuery.data ?? []}
            columns={memberColumns}
            loading={membersQuery.isLoading}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </Box>
      ) : (
        <Box sx={{ height: 420, width: "100%" }}>
          <DataGrid
            rows={occupanciesQuery.data ?? []}
            columns={occColumns}
            loading={occupanciesQuery.isLoading}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      <Dialog
        open={memberOpen}
        onClose={() => setMemberOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>افزودن عضو ساختمان</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="member-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={memberForm.handleSubmit((values) => {
              addMember.mutate(values, {
                onSuccess: () => setMemberOpen(false),
              });
            })}
          >
            <TextField
              label="ایمیل کاربر"
              fullWidth
              {...memberForm.register("email")}
            />
            <TextField
              select
              label="نقش"
              fullWidth
              value={memberForm.watch("role")}
              onChange={(e) =>
                memberForm.setValue(
                  "role",
                  e.target.value as BuildingMemberRole,
                )
              }
            >
              <MenuItem value="MANAGER">مدیر ساختمان</MenuItem>
              <MenuItem value="BOARD">هیئت‌مدیره</MenuItem>
              <MenuItem value="RESIDENT">ساکن</MenuItem>
              <MenuItem value="GUARD">نگهبان</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setMemberOpen(false)}>انصراف</Button>
          <Button type="submit" form="member-form" variant="contained">
            افزودن
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={occOpen} onClose={() => setOccOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>اتصال ساکن به واحد</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="occ-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={occForm.handleSubmit((values) => {
              addOccupancy.mutate(values, {
                onSuccess: () => setOccOpen(false),
              });
            })}
          >
            <TextField
              label="ایمیل کاربر"
              fullWidth
              {...occForm.register("email")}
            />
            <TextField
              select
              label="واحد"
              fullWidth
              value={occForm.watch("unitId")}
              onChange={(e) => occForm.setValue("unitId", e.target.value)}
            >
              {(unitsQuery.data ?? []).map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>
                  واحد {unit.number}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="نوع"
              fullWidth
              value={occForm.watch("type")}
              onChange={(e) =>
                occForm.setValue("type", e.target.value as OccupancyType)
              }
            >
              <MenuItem value="OWNER">مالک</MenuItem>
              <MenuItem value="TENANT">مستأجر</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOccOpen(false)}>انصراف</Button>
          <Button type="submit" form="occ-form" variant="contained">
            اتصال
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
