"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ApiError } from "@/lib/api";
import { queryKeys } from "@/lib/query/keys";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
} from "@/features/users/api";
import type {
  CreateUserInput,
  ListUsersParams,
  UpdateUserInput,
} from "@/features/users/types";

export function useUsers(params: ListUsersParams) {
  return useQuery({
    queryKey: queryKeys.users.list({
      search: params.search ?? "",
      role: params.role ?? "ALL",
    }),
    queryFn: () => listUsers(params),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      enqueueSnackbar("کاربر ایجاد شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "ایجاد کاربر ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateUserInput }) =>
      updateUser(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      enqueueSnackbar("کاربر به‌روزرسانی شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError
          ? error.message
          : "به‌روزرسانی کاربر ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      enqueueSnackbar("کاربر حذف شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "حذف کاربر ناموفق بود",
        { variant: "error" },
      );
    },
  });
}
