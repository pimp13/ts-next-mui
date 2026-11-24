export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  bms: {
    all: ["bms"] as const,
    overview: (buildingId: string) =>
      ["bms", "overview", buildingId] as const,
    buildings: ["bms", "buildings"] as const,
    units: (buildingId: string) => ["bms", "units", buildingId] as const,
    members: (buildingId: string) => ["bms", "members", buildingId] as const,
    occupancies: (buildingId: string) =>
      ["bms", "occupancies", buildingId] as const,
    periods: (buildingId: string) => ["bms", "periods", buildingId] as const,
    invoices: (buildingId: string) =>
      ["bms", "invoices", buildingId] as const,
    payments: (buildingId: string) =>
      ["bms", "payments", buildingId] as const,
    expenses: (buildingId: string) =>
      ["bms", "expenses", buildingId] as const,
    tickets: (buildingId: string) => ["bms", "tickets", buildingId] as const,
    announcements: (buildingId: string) =>
      ["bms", "announcements", buildingId] as const,
  },
} as const;
