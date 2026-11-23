"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormValues,
  type UpdateUserFormValues,
} from "@/features/users/schemas";
import type { ManagedUser } from "@/features/users/types";

type UserFormDialogProps = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  user?: ManagedUser | null;
  pending?: boolean;
  onSubmitCreate: (values: CreateUserFormValues) => void;
  onSubmitUpdate: (values: UpdateUserFormValues) => void;
};

const roleOptions = [
  { value: "user", label: "User" },
  { value: "editor", label: "Editor" },
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
] as const;

export function UserFormDialog({
  open,
  onClose,
  mode,
  user,
  pending,
  onSubmitCreate,
  onSubmitUpdate,
}: UserFormDialogProps) {
  const isEdit = mode === "edit";

  const createForm = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role_slug: "user",
    },
  });

  const editForm = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role_slug: "user",
      status: "active",
    },
  });

  useEffect(() => {
    if (!open) return;
    if (isEdit && user) {
      editForm.reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: "",
        role_slug: (user.role?.slug as UpdateUserFormValues["role_slug"]) || "user",
        status:
          (user.status as UpdateUserFormValues["status"]) || "active",
      });
      return;
    }
    createForm.reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role_slug: "user",
    });
  }, [open, isEdit, user, createForm, editForm]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit user" : "Create user"}</DialogTitle>
      <DialogContent>
        {isEdit ? (
          <Stack
            component="form"
            id="user-edit-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={editForm.handleSubmit(onSubmitUpdate)}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="First name"
                fullWidth
                error={Boolean(editForm.formState.errors.first_name)}
                helperText={editForm.formState.errors.first_name?.message}
                {...editForm.register("first_name")}
              />
              <TextField
                label="Last name"
                fullWidth
                error={Boolean(editForm.formState.errors.last_name)}
                helperText={editForm.formState.errors.last_name?.message}
                {...editForm.register("last_name")}
              />
            </Stack>
            <TextField
              label="Email"
              type="email"
              fullWidth
              error={Boolean(editForm.formState.errors.email)}
              helperText={editForm.formState.errors.email?.message}
              {...editForm.register("email")}
            />
            <TextField
              label="New password (optional)"
              type="password"
              fullWidth
              error={Boolean(editForm.formState.errors.password)}
              helperText={editForm.formState.errors.password?.message}
              {...editForm.register("password")}
            />
            <Controller
              control={editForm.control}
              name="role_slug"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  fullWidth
                  error={Boolean(editForm.formState.errors.role_slug)}
                  helperText={editForm.formState.errors.role_slug?.message}
                >
                  {roleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              control={editForm.control}
              name="status"
              render={({ field }) => (
                <TextField {...field} select label="Status" fullWidth>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="banned">Banned</MenuItem>
                </TextField>
              )}
            />
          </Stack>
        ) : (
          <Stack
            component="form"
            id="user-create-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={createForm.handleSubmit(onSubmitCreate)}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="First name"
                fullWidth
                error={Boolean(createForm.formState.errors.first_name)}
                helperText={createForm.formState.errors.first_name?.message}
                {...createForm.register("first_name")}
              />
              <TextField
                label="Last name"
                fullWidth
                error={Boolean(createForm.formState.errors.last_name)}
                helperText={createForm.formState.errors.last_name?.message}
                {...createForm.register("last_name")}
              />
            </Stack>
            <TextField
              label="Email"
              type="email"
              fullWidth
              error={Boolean(createForm.formState.errors.email)}
              helperText={createForm.formState.errors.email?.message}
              {...createForm.register("email")}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              error={Boolean(createForm.formState.errors.password)}
              helperText={createForm.formState.errors.password?.message}
              {...createForm.register("password")}
            />
            <Controller
              control={createForm.control}
              name="role_slug"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  fullWidth
                  error={Boolean(createForm.formState.errors.role_slug)}
                  helperText={createForm.formState.errors.role_slug?.message}
                >
                  {roleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={pending}>
          Cancel
        </Button>
        <Button
          type="submit"
          form={isEdit ? "user-edit-form" : "user-create-form"}
          variant="contained"
          disabled={pending}
        >
          {pending
            ? isEdit
              ? "Saving..."
              : "Creating..."
            : isEdit
              ? "Save changes"
              : "Create user"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
