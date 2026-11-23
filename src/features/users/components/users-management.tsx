"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "@/features/users/hooks/use-users";
import { UserFormDialog } from "@/features/users/components/user-form-dialog";
import {
  usersFiltersSchema,
  type CreateUserFormValues,
  type UpdateUserFormValues,
  type UsersFiltersValues,
} from "@/features/users/schemas";
import {
  userDisplayName,
  type ManagedUser,
} from "@/features/users/types";

export function UsersManagement() {
  const filtersForm = useForm<UsersFiltersValues>({
    resolver: zodResolver(usersFiltersSchema),
    defaultValues: { search: "", role: "ALL" },
  });
  const filters = filtersForm.watch();

  const usersQuery = useUsers({
    search: filters.search,
    role: filters.role === "ALL" ? undefined : filters.role,
  });
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<ManagedUser | null>(null);

  const columns = useMemo<GridColDef<ManagedUser>[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 160,
        valueGetter: (_value, row) => userDisplayName(row),
      },
      { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
      {
        field: "role",
        headerName: "Role",
        width: 140,
        valueGetter: (_value, row) => row.role?.name || row.role?.slug || "—",
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell: (params) => (
          <Chip
            size="small"
            label={params.value}
            color={params.value === "active" ? "success" : "default"}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 160,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              startIcon={<EditOutlinedIcon />}
              onClick={() => {
                setSelected(params.row);
                setMode("edit");
                setDialogOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<DeleteOutlinedIcon />}
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (window.confirm(`Delete ${userDisplayName(params.row)}?`)) {
                  deleteMutation.mutate(params.row.id);
                }
              }}
            >
              Delete
            </Button>
          </Stack>
        ),
      },
    ],
    [deleteMutation],
  );

  return (
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Users
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Manage accounts through the Go users API with React Query.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelected(null);
            setMode("create");
            setDialogOpen(true);
          }}
        >
          Add user
        </Button>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Search"
          size="small"
          fullWidth
          {...filtersForm.register("search")}
        />
        <TextField
          select
          label="Role"
          size="small"
          sx={{ minWidth: 180 }}
          value={filters.role}
          onChange={(event) =>
            filtersForm.setValue(
              "role",
              event.target.value as UsersFiltersValues["role"],
            )
          }
        >
          <MenuItem value="ALL">All roles</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="super_admin">Super Admin</MenuItem>
        </TextField>
      </Stack>

      <Box sx={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={usersQuery.data ?? []}
          columns={columns}
          loading={usersQuery.isLoading}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          disableRowSelectionOnClick
        />
      </Box>

      <UserFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        mode={mode}
        user={selected}
        pending={createMutation.isPending || updateMutation.isPending}
        onSubmitCreate={(values: CreateUserFormValues) => {
          createMutation.mutate(values, {
            onSuccess: () => setDialogOpen(false),
          });
        }}
        onSubmitUpdate={(values: UpdateUserFormValues) => {
          if (!selected) return;
          updateMutation.mutate(
            {
              id: selected.id,
              input: {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                role_slug: values.role_slug,
                status: values.status,
                ...(values.password ? { password: values.password } : {}),
              },
            },
            { onSuccess: () => setDialogOpen(false) },
          );
        }}
      />
    </Stack>
  );
}
