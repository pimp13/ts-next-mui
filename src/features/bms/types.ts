export type ChargeFormula = "EQUAL" | "BY_AREA" | "HYBRID";

export type BuildingMemberRole = "MANAGER" | "BOARD" | "RESIDENT" | "GUARD";

export type OccupancyType = "OWNER" | "TENANT";

export type InvoiceStatus =
  | "DRAFT"
  | "ISSUED"
  | "PARTIALLY_PAID"
  | "PAID"
  | "OVERDUE";

export type PaymentStatus = "PENDING" | "CONFIRMED" | "REJECTED";

export type PaymentMethod = "CASH" | "CARD" | "TRANSFER" | "OTHER";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE" | "CANCELLED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";

export type Building = {
  id: string;
  name: string;
  address: string;
  chargeFormula: ChargeFormula;
  fixedFeePerUnit: number;
  feePerSqm: number;
  lateFeePercent: number;
  isActive: boolean;
  unitCount?: number;
};

export type Unit = {
  id: string;
  buildingId: string;
  number: string;
  floor: number | null;
  areaSqm: number;
  parkingCount: number;
  storageCount: number;
  isActive: boolean;
  building?: { id: string; name: string };
};

export type BuildingMembership = {
  id: string;
  buildingId: string;
  userId: string;
  role: BuildingMemberRole;
  user?: { id: string; name: string; email: string };
  building?: { id: string; name: string };
};

export type UnitOccupancy = {
  id: string;
  unitId: string;
  userId: string;
  type: OccupancyType;
  isPrimary: boolean;
  user?: { id: string; name: string; email: string };
  unit?: { id: string; number: string; buildingId: string };
};

export type ChargePeriod = {
  id: string;
  buildingId: string;
  label: string;
  yearMonth: string;
  dueDate: string;
  status: "DRAFT" | "ISSUED" | "CLOSED";
  notes?: string | null;
  invoiceCount?: number;
};

export type Invoice = {
  id: string;
  buildingId: string;
  unitId: string;
  periodId: string;
  amount: number;
  paidAmount: number;
  status: InvoiceStatus;
  issuedAt?: string | null;
  unit?: { id: string; number: string };
  period?: { id: string; label: string; yearMonth: string };
};

export type Payment = {
  id: string;
  buildingId: string;
  unitId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  note?: string | null;
  paidAt: string;
  unit?: { id: string; number: string };
};

export type Expense = {
  id: string;
  buildingId: string;
  title: string;
  amount: number;
  category: string;
  spentAt: string;
  periodId?: string | null;
  note?: string | null;
};

export type ServiceTicket = {
  id: string;
  buildingId: string;
  unitId?: string | null;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  unit?: { id: string; number: string } | null;
};

export type Announcement = {
  id: string;
  buildingId: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: string;
};

export type FundSummary = {
  confirmedPayments: number;
  expenses: number;
  balance: number;
  outstandingInvoices: number;
  openTickets: number;
  overdueInvoices: number;
};

export const chargeFormulaLabel: Record<ChargeFormula, string> = {
  EQUAL: "مساوی",
  BY_AREA: "بر اساس متراژ",
  HYBRID: "ترکیبی",
};

export const invoiceStatusLabel: Record<InvoiceStatus, string> = {
  DRAFT: "پیش‌نویس",
  ISSUED: "صادرشده",
  PARTIALLY_PAID: "پرداخت جزئی",
  PAID: "پرداخت‌شده",
  OVERDUE: "معوق",
};

export const paymentStatusLabel: Record<PaymentStatus, string> = {
  PENDING: "در انتظار تأیید",
  CONFIRMED: "تأییدشده",
  REJECTED: "ردشده",
};

export const paymentMethodLabel: Record<PaymentMethod, string> = {
  CASH: "نقد",
  CARD: "کارت",
  TRANSFER: "کارت‌به‌کارت / واریز",
  OTHER: "سایر",
};

export const ticketStatusLabel: Record<TicketStatus, string> = {
  OPEN: "باز",
  IN_PROGRESS: "در حال انجام",
  DONE: "انجام‌شده",
  CANCELLED: "لغو",
};

export const ticketPriorityLabel: Record<TicketPriority, string> = {
  LOW: "کم",
  MEDIUM: "متوسط",
  HIGH: "بالا",
};

export const memberRoleLabel: Record<BuildingMemberRole, string> = {
  MANAGER: "مدیر ساختمان",
  BOARD: "هیئت‌مدیره",
  RESIDENT: "ساکن",
  GUARD: "نگهبان",
};

export const occupancyTypeLabel: Record<OccupancyType, string> = {
  OWNER: "مالک",
  TENANT: "مستأجر",
};

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("fa-IR").format(amount) + " ریال";
}
