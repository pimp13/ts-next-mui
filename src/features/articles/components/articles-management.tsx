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
  useArticles,
  useCreateArticle,
  useDeleteArticle,
  useUpdateArticle,
} from "@/features/articles/hooks/use-articles";
import { ArticleFormDialog } from "@/features/articles/components/article-form-dialog";
import {
  articlesFiltersSchema,
  type ArticleFormValues,
  type ArticlesFiltersValues,
} from "@/features/articles/schemas";
import type { Article } from "@/features/articles/types";

const statusLabel: Record<string, string> = {
  draft: "پیش‌نویس",
  published: "منتشرشده",
  archived: "بایگانی",
};

export function ArticlesManagement() {
  const filtersForm = useForm<ArticlesFiltersValues>({
    resolver: zodResolver(articlesFiltersSchema),
    defaultValues: { search: "", status: "all" },
  });
  const filters = filtersForm.watch();

  const articlesQuery = useArticles({
    search: filters.search,
    status: filters.status,
  });
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const deleteMutation = useDeleteArticle();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selected, setSelected] = useState<Article | null>(null);

  const columns = useMemo<GridColDef<Article>[]>(
    () => [
      { field: "title", headerName: "عنوان", flex: 1, minWidth: 180 },
      { field: "slug", headerName: "اسلاگ", width: 180 },
      {
        field: "status",
        headerName: "وضعیت",
        width: 130,
        renderCell: (params) => (
          <Chip
            size="small"
            label={statusLabel[String(params.value)] ?? params.value}
            color={
              params.value === "published"
                ? "success"
                : params.value === "archived"
                  ? "default"
                  : "warning"
            }
          />
        ),
      },
      {
        field: "view_count",
        headerName: "بازدید",
        width: 90,
        type: "number",
      },
      {
        field: "created_at",
        headerName: "ایجاد",
        width: 130,
        valueFormatter: (value) =>
          value
            ? new Date(String(value)).toLocaleDateString("fa-IR")
            : "—",
      },
      {
        field: "actions",
        headerName: "عملیات",
        width: 180,
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
              ویرایش
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<DeleteOutlinedIcon />}
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (window.confirm(`حذف «${params.row.title}»؟`)) {
                  deleteMutation.mutate(params.row.id);
                }
              }}
            >
              حذف
            </Button>
          </Stack>
        ),
      },
    ],
    [deleteMutation],
  );

  const submitForm = (values: ArticleFormValues) => {
    const input = {
      title: values.title,
      slug: values.slug || undefined,
      excerpt: values.excerpt,
      content: values.content,
      cover_image: values.cover_image || undefined,
      status: values.status,
    };

    if (mode === "create") {
      createMutation.mutate(input, {
        onSuccess: () => setDialogOpen(false),
      });
      return;
    }

    if (!selected) return;
    updateMutation.mutate(
      { id: selected.id, input },
      { onSuccess: () => setDialogOpen(false) },
    );
  };

  return (
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            مقالات
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            فضای ویرایشی با React Hook Form و React Query.
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
          مقاله جدید
        </Button>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="جستجو"
          size="small"
          fullWidth
          {...filtersForm.register("search")}
        />
        <TextField
          select
          label="وضعیت"
          size="small"
          sx={{ minWidth: 180 }}
          value={filters.status}
          onChange={(event) =>
            filtersForm.setValue(
              "status",
              event.target.value as ArticlesFiltersValues["status"],
            )
          }
        >
          <MenuItem value="all">همه</MenuItem>
          <MenuItem value="draft">پیش‌نویس</MenuItem>
          <MenuItem value="published">منتشرشده</MenuItem>
          <MenuItem value="archived">بایگانی</MenuItem>
        </TextField>
      </Stack>

      <Box sx={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={articlesQuery.data ?? []}
          columns={columns}
          loading={articlesQuery.isLoading}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          disableRowSelectionOnClick
        />
      </Box>

      <ArticleFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        mode={mode}
        article={selected}
        pending={createMutation.isPending || updateMutation.isPending}
        onSubmit={submitForm}
      />
    </Stack>
  );
}
