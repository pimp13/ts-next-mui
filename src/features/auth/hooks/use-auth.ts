"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ApiError } from "@/lib/api";
import { queryKeys } from "@/lib/query/keys";
import { getMe, login, logout } from "@/features/auth/api";
import type { LoginInput } from "@/features/auth/types";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      try {
        const response = await getMe();
        return response.data ?? null;
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: async (response) => {
      queryClient.setQueryData(queryKeys.auth.me, response.data ?? null);
      enqueueSnackbar("Signed in", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "Login failed",
        { variant: "error" },
      );
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      queryClient.setQueryData(queryKeys.auth.me, null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      enqueueSnackbar("Signed out", { variant: "success" });
    },
  });
}
