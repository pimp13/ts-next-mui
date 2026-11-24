import { z } from "zod";

export const articleStatusSchema = z.enum(["draft", "published", "archived"]);

export const articlesFiltersSchema = z.object({
  search: z.string().max(80),
  status: z.enum(["all", "draft", "published", "archived"]),
});

export const articleFormSchema = z.object({
  title: z.string().min(3, "عنوان حداقل ۳ کاراکتر باشد").max(255),
  slug: z
    .string()
    .max(255)
    .refine(
      (value) => value === "" || value.length >= 3,
      "اسلاگ حداقل ۳ کاراکتر باشد",
    ),
  excerpt: z.string().min(3, "خلاصه حداقل ۳ کاراکتر باشد").max(500),
  content: z.string().min(3, "محتوا حداقل ۳ کاراکتر باشد"),
  cover_image: z
    .string()
    .max(500)
    .refine(
      (value) => value === "" || value.length >= 3,
      "آدرس تصویر کاور حداقل ۳ کاراکتر باشد",
    ),
  status: articleStatusSchema,
});

export type ArticlesFiltersValues = z.infer<typeof articlesFiltersSchema>;
export type ArticleFormValues = z.infer<typeof articleFormSchema>;
