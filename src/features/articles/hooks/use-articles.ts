"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ApiError } from "@/lib/api";
import { queryKeys } from "@/lib/query/keys";
import {
  createArticle,
  deleteArticle,
  listArticles,
  updateArticle,
} from "@/features/articles/api";
import type {
  CreateArticleInput,
  ListArticlesParams,
  UpdateArticleInput,
} from "@/features/articles/types";

export function useArticles(params: ListArticlesParams) {
  return useQuery({
    queryKey: queryKeys.articles.list({
      search: params.search ?? "",
      status: params.status ?? "all",
    }),
    queryFn: async () => {
      const response = await listArticles(params);
      return response.data ?? [];
    },
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (input: CreateArticleInput) => createArticle(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      enqueueSnackbar("Article created", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "Failed to create article",
        { variant: "error" },
      );
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateArticleInput }) =>
      updateArticle(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      enqueueSnackbar("Article updated", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "Failed to update article",
        { variant: "error" },
      );
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (id: string) => deleteArticle(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      enqueueSnackbar("Article deleted", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "Failed to delete article",
        { variant: "error" },
      );
    },
  });
}
