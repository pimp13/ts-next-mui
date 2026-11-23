export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params: { search: string; role: string }) =>
      ["users", "list", params] as const,
  },
  articles: {
    all: ["articles"] as const,
    list: (params: { search: string; status: string }) =>
      ["articles", "list", params] as const,
    detail: (id: string) => ["articles", "detail", id] as const,
  },
  dashboard: {
    overview: ["dashboard", "overview"] as const,
  },
} as const;
