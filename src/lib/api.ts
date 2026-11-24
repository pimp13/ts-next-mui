export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

/** @deprecated use API_URL — kept for older Go-oriented env names */
export const GO_API_URL =
  process.env.NEXT_PUBLIC_GO_API_URL ?? API_URL;
export const GO_ORIGIN =
  process.env.NEXT_PUBLIC_GO_ORIGIN ??
  process.env.NEXT_PUBLIC_API_ORIGIN ??
  "http://localhost:3000";

export type ApiResponse<T> = {
  ok?: boolean;
  success?: boolean;
  message?: string;
  data?: T;
};

type GoApiEnvelope<T> = {
  result?: {
    success?: boolean;
    data?: T;
    error?: {
      code?: string;
      message?: string;
    } | null;
  };
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function normalizePayload<T>(payload: unknown): ApiResponse<T> {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  const record = payload as ApiResponse<T> & GoApiEnvelope<T>;

  if (record.result && typeof record.result === "object") {
    return {
      success: record.result.success,
      ok: record.result.success,
      data: record.result.data,
      message: record.result.error?.message,
    };
  }

  return {
    ok: record.ok,
    success: record.success ?? record.ok,
    data: record.data,
    message: record.message,
  };
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const headers = new Headers(init?.headers);
  const isFormData =
    typeof FormData !== "undefined" && init?.body instanceof FormData;

  if (init?.body != null && !headers.has("Content-Type") && !isFormData) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers,
  });

  const raw = (await response.json()) as unknown;
  const payload = normalizePayload<T>(raw);

  const succeeded =
    response.ok &&
    (payload.ok === true ||
      payload.success === true ||
      (payload.ok === undefined &&
        payload.success === undefined &&
        response.ok));

  if (!succeeded) {
    throw new ApiError(payload.message || "درخواست ناموفق بود", response.status);
  }

  return payload;
}

/** Alias for older call sites */
export const goApiFetch = apiFetch;
