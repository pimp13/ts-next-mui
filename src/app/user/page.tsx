"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  age: number;
}

const rows: User[] = [
  {
    id: 1,
    name: "Pouya",
    email: "pouya@example.com",
    role: "Admin",
    status: "active",
    age: 22,
  },
  {
    id: 2,
    name: "Ali",
    email: "ali@example.com",
    role: "User",
    status: "inactive",
    age: 25,
  },
  {
    id: 3,
    name: "Reza",
    email: "reza@example.com",
    role: "Manager",
    status: "active",
    age: 28,
  },
  {
    id: 4,
    name: "Sara",
    email: "sara@example.com",
    role: "User",
    status: "active",
    age: 24,
  },
];

const columns: GridColDef<User>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "name",
    headerName: "Full Name",
    width: 160,
  },
  {
    field: "email",
    headerName: "Email",
    width: 220,
  },
  {
    field: "role",
    headerName: "Role",
    width: 120,
  },
  {
    field: "age",
    headerName: "Age",
    width: 100,
    type: "number",
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value === "active" ? "Active" : "Inactive"}
        color={params.value === "active" ? "success" : "default"}
        size="small"
      />
    ),
  },
];

export default function UsersDataGrid() {
  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              page: 0,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}