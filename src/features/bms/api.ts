import { apiFetch } from "@/lib/api";
import type {
  Announcement,
  Building,
  BuildingMembership,
  BuildingMemberRole,
  ChargeFormula,
  ChargePeriod,
  Expense,
  FundSummary,
  Invoice,
  OccupancyType,
  Payment,
  PaymentMethod,
  ServiceTicket,
  TicketPriority,
  TicketStatus,
  Unit,
  UnitOccupancy,
} from "@/features/bms/types";

export function listBuildings() {
  return apiFetch<Building[]>("/bms/buildings");
}

export function createBuilding(input: {
  name: string;
  address?: string;
  chargeFormula?: ChargeFormula;
  fixedFeePerUnit?: number;
  feePerSqm?: number;
  lateFeePercent?: number;
}) {
  return apiFetch<Building>("/admin/bms/buildings", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateBuilding(
  id: string,
  input: Partial<{
    name: string;
    address: string;
    chargeFormula: ChargeFormula;
    fixedFeePerUnit: number;
    feePerSqm: number;
    lateFeePercent: number;
    isActive: boolean;
  }>,
) {
  return apiFetch<Building>(`/admin/bms/buildings/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function listUnits(buildingId: string) {
  return apiFetch<Unit[]>(`/bms/buildings/${buildingId}/units`);
}

export function createUnit(
  buildingId: string,
  input: {
    number: string;
    floor?: number | null;
    areaSqm?: number;
    parkingCount?: number;
    storageCount?: number;
  },
) {
  return apiFetch<Unit>(`/admin/bms/buildings/${buildingId}/units`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function listMembers(buildingId: string) {
  return apiFetch<BuildingMembership[]>(
    `/bms/buildings/${buildingId}/members`,
  );
}

export function addMember(
  buildingId: string,
  input: { email: string; role: BuildingMemberRole },
) {
  return apiFetch<BuildingMembership>(
    `/admin/bms/buildings/${buildingId}/members`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function listOccupancies(buildingId: string) {
  return apiFetch<UnitOccupancy[]>(
    `/bms/buildings/${buildingId}/occupancies`,
  );
}

export function addOccupancy(
  buildingId: string,
  input: {
    unitId: string;
    email: string;
    type: OccupancyType;
    isPrimary?: boolean;
  },
) {
  return apiFetch<UnitOccupancy>(
    `/admin/bms/buildings/${buildingId}/occupancies`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function listPeriods(buildingId: string) {
  return apiFetch<ChargePeriod[]>(`/bms/buildings/${buildingId}/periods`);
}

export function createPeriod(
  buildingId: string,
  input: { label: string; yearMonth: string; dueDate: string; notes?: string },
) {
  return apiFetch<ChargePeriod>(
    `/admin/bms/buildings/${buildingId}/periods`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function issuePeriod(buildingId: string, periodId: string) {
  return apiFetch<{ period: ChargePeriod; invoices: Invoice[] }>(
    `/admin/bms/buildings/${buildingId}/periods/${periodId}/issue`,
    { method: "POST" },
  );
}

export function listInvoices(buildingId: string) {
  return apiFetch<Invoice[]>(`/bms/buildings/${buildingId}/invoices`);
}

export function listPayments(buildingId: string) {
  return apiFetch<Payment[]>(`/bms/buildings/${buildingId}/payments`);
}

export function createPayment(
  buildingId: string,
  input: {
    unitId: string;
    amount: number;
    method: PaymentMethod;
    note?: string;
    invoiceId?: string;
  },
) {
  return apiFetch<Payment>(`/admin/bms/buildings/${buildingId}/payments`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function confirmPayment(buildingId: string, paymentId: string) {
  return apiFetch<Payment>(
    `/admin/bms/buildings/${buildingId}/payments/${paymentId}/confirm`,
    { method: "POST" },
  );
}

export function rejectPayment(buildingId: string, paymentId: string) {
  return apiFetch<Payment>(
    `/admin/bms/buildings/${buildingId}/payments/${paymentId}/reject`,
    { method: "POST" },
  );
}

export function listExpenses(buildingId: string) {
  return apiFetch<Expense[]>(`/bms/buildings/${buildingId}/expenses`);
}

export function createExpense(
  buildingId: string,
  input: {
    title: string;
    amount: number;
    category: string;
    spentAt: string;
    note?: string;
    periodId?: string;
  },
) {
  return apiFetch<Expense>(`/admin/bms/buildings/${buildingId}/expenses`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function listTickets(buildingId: string) {
  return apiFetch<ServiceTicket[]>(`/bms/buildings/${buildingId}/tickets`);
}

export function createTicket(
  buildingId: string,
  input: {
    title: string;
    description: string;
    unitId?: string;
    priority?: TicketPriority;
  },
) {
  return apiFetch<ServiceTicket>(`/bms/buildings/${buildingId}/tickets`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateTicketStatus(
  buildingId: string,
  ticketId: string,
  status: TicketStatus,
) {
  return apiFetch<ServiceTicket>(
    `/admin/bms/buildings/${buildingId}/tickets/${ticketId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );
}

export function listAnnouncements(buildingId: string) {
  return apiFetch<Announcement[]>(
    `/bms/buildings/${buildingId}/announcements`,
  );
}

export function createAnnouncement(
  buildingId: string,
  input: { title: string; body: string; pinned?: boolean },
) {
  return apiFetch<Announcement>(
    `/admin/bms/buildings/${buildingId}/announcements`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function getOverview(buildingId: string) {
  return apiFetch<FundSummary>(`/bms/buildings/${buildingId}/overview`);
}
