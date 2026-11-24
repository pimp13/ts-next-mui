export const GO_API_URL =
  process.env.NEXT_PUBLIC_GO_API_URL ?? "http://localhost:8080/api";
export const GO_ORIGIN =
  process.env.NEXT_PUBLIC_GO_ORIGIN ?? "http://localhost:8080";

export type ApiResponse<T> = {
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
      data: record.result.data,
      message: record.result.error?.message,
    };
  }

  return {
    success: record.success,
    data: record.data,
    message: record.message,
  };
}

export async function goApiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const headers = new Headers(init?.headers);
  const isFormData =
    typeof FormData !== "undefined" && init?.body instanceof FormData;

  if (init?.body != null && !headers.has("Content-Type") && !isFormData) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${GO_API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers,
  });

  const raw = (await response.json()) as unknown;
  const payload = normalizePayload<T>(raw);

  const succeeded =
    response.ok &&
    (payload.success === true ||
      (payload.success === undefined && response.ok));

  if (!succeeded) {
    throw new ApiError(payload.message || "درخواست ناموفق بود", response.status);
  }

  return payload;
}
