import { goApiFetch, type ApiResponse } from "@/lib/api";
import {
  mapGoAuthUser,
  type GoAuthUser,
  type GoSession,
  type LoginInput,
  type User,
} from "@/features/auth/types";

function asUserResponse(
  payload: ApiResponse<GoAuthUser | GoSession>,
): ApiResponse<User> {
  const raw = payload.data;
  if (!raw) return { ...payload, data: undefined };

  if ("user" in raw && raw.user) {
    return { ...payload, data: mapGoAuthUser(raw.user) };
  }

  return { ...payload, data: mapGoAuthUser(raw as GoAuthUser) };
}

export async function login(input: LoginInput) {
  const response = await goApiFetch<GoSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return asUserResponse(response);
}

export function logout() {
  return goApiFetch<{ message: string }>("/auth/logout", {
    method: "POST",
  });
}

export async function getMe() {
  const response = await goApiFetch<GoAuthUser>("/auth/me", {
    method: "GET",
  });
  return asUserResponse(response);
}
