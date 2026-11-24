import { z } from "zod";

export const goRoleSlugSchema = z.enum([
  "user",
  "editor",
  "admin",
  "super_admin",
]);

export const usersFiltersSchema = z.object({
  search: z.string().max(80),
  role: z.enum(["ALL", "user", "editor", "admin", "super_admin"]),
});

export const createUserSchema = z.object({
  first_name: z.string().min(2, "نام حداقل ۲ کاراکتر باشد"),
  last_name: z.string().min(2, "نام خانوادگی حداقل ۲ کاراکتر باشد"),
  email: z.email("ایمیل معتبر وارد کنید"),
  password: z.string().min(8, "رمز عبور حداقل ۸ کاراکتر باشد"),
  role_slug: goRoleSlugSchema,
});

export const updateUserSchema = z.object({
  first_name: z.string().min(2, "نام حداقل ۲ کاراکتر باشد"),
  last_name: z.string().min(2, "نام خانوادگی حداقل ۲ کاراکتر باشد"),
  email: z.email("ایمیل معتبر وارد کنید"),
  password: z
    .string()
    .refine(
      (value) => value === "" || value.length >= 8,
      "رمز عبور حداقل ۸ کاراکتر باشد",
    ),
  role_slug: goRoleSlugSchema,
  status: z.enum(["active", "inactive", "banned"]),
});

export type UsersFiltersValues = z.infer<typeof usersFiltersSchema>;
export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
