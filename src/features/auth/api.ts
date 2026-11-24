import { apiFetch, type ApiResponse } from "@/lib/api";
import {
  mapAuthUser,
  type FastifyAuthUser,
  type GoAuthUser,
  type GoSession,
  type LoginInput,
  type User,
} from "@/features/auth/types";

function asUserResponse(
  payload: ApiResponse<FastifyAuthUser | GoAuthUser | GoSession>,
): ApiResponse<User> {
  const raw = payload.data;
  if (!raw) return { ...payload, data: undefined };
  return { ...payload, data: mapAuthUser(raw) };
}

export async function login(input: LoginInput) {
  const response = await apiFetch<FastifyAuthUser | GoSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return asUserResponse(response);
}

export function logout() {
  return apiFetch<{ message: string }>("/auth/logout", {
    method: "POST",
  });
}

export async function getMe() {
  const response = await apiFetch<FastifyAuthUser | GoAuthUser>("/auth/me", {
    method: "GET",
  });
  return asUserResponse(response);
}
