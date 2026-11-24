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
  articleFormSchema,
  type ArticleFormValues,
} from "@/features/articles/schemas";
import type { Article } from "@/features/articles/types";

type ArticleFormDialogProps = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  article?: Article | null;
  pending?: boolean;
  onSubmit: (values: ArticleFormValues) => void;
};

export function ArticleFormDialog({
  open,
  onClose,
  mode,
  article,
  pending,
  onSubmit,
}: ArticleFormDialogProps) {
  const isEdit = mode === "edit";
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "",
      status: "draft",
    },
  });

  useEffect(() => {
    if (!open) return;
    if (isEdit && article) {
      form.reset({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        cover_image: article.cover_image ?? "",
        status: article.status,
      });
      return;
    }
    form.reset({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "",
      status: "draft",
    });
  }, [open, isEdit, article, form]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{isEdit ? "ویرایش مقاله" : "ایجاد مقاله"}</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          id="article-form"
          spacing={2}
          sx={{ mt: 1 }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextField
            label="عنوان"
            fullWidth
            error={Boolean(form.formState.errors.title)}
            helperText={form.formState.errors.title?.message}
            {...form.register("title")}
          />
          <TextField
            label="اسلاگ"
            fullWidth
            placeholder="اختیاری-خودکار-یا-سفارشی"
            error={Boolean(form.formState.errors.slug)}
            helperText={form.formState.errors.slug?.message}
            {...form.register("slug")}
          />
          <TextField
            label="خلاصه"
            fullWidth
            multiline
            minRows={2}
            error={Boolean(form.formState.errors.excerpt)}
            helperText={form.formState.errors.excerpt?.message}
            {...form.register("excerpt")}
          />
          <TextField
            label="محتوا"
            fullWidth
            multiline
            minRows={5}
            error={Boolean(form.formState.errors.content)}
            helperText={form.formState.errors.content?.message}
            {...form.register("content")}
          />
          <TextField
            label="آدرس تصویر کاور"
            fullWidth
            error={Boolean(form.formState.errors.cover_image)}
            helperText={form.formState.errors.cover_image?.message}
            {...form.register("cover_image")}
          />
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <TextField {...field} select label="وضعیت" fullWidth>
                <MenuItem value="draft">پیش‌نویس</MenuItem>
                <MenuItem value="published">منتشرشده</MenuItem>
                <MenuItem value="archived">بایگانی</MenuItem>
              </TextField>
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={pending}>
          انصراف
        </Button>
        <Button
          type="submit"
          form="article-form"
          variant="contained"
          disabled={pending}
        >
          {pending
            ? isEdit
              ? "در حال ذخیره..."
              : "در حال ایجاد..."
            : isEdit
              ? "ذخیره تغییرات"
              : "ایجاد مقاله"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
