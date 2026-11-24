"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { ApiError } from "@/lib/api";
import { queryKeys } from "@/lib/query/keys";
import * as api from "@/features/bms/api";
import type { TicketStatus } from "@/features/bms/types";

function useBuildingScopedInvalidation(buildingId: string) {
  const queryClient = useQueryClient();
  return async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.bms.all });
    if (buildingId) {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.bms.overview(buildingId),
      });
    }
  };
}

export function useBuildings() {
  return useQuery({
    queryKey: queryKeys.bms.buildings,
    queryFn: async () => (await api.listBuildings()).data ?? [],
  });
}

export function useCreateBuilding() {
  const invalidate = useBuildingScopedInvalidation("");
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: api.createBuilding,
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("ساختمان ایجاد شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "ایجاد ساختمان ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useUnits(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.units(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.listUnits(buildingId)).data ?? [],
  });
}

export function useCreateUnit(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (
      input: Parameters<typeof api.createUnit>[1],
    ) => api.createUnit(buildingId, input),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("واحد ایجاد شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "ایجاد واحد ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useMembers(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.members(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.listMembers(buildingId)).data ?? [],
  });
}

export function useAddMember(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (input: Parameters<typeof api.addMember>[1]) =>
      api.addMember(buildingId, input),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("عضو اضافه شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "افزودن عضو ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useOccupancies(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.occupancies(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.listOccupancies(buildingId)).data ?? [],
  });
}

export function useAddOccupancy(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (input: Parameters<typeof api.addOccupancy>[1]) =>
      api.addOccupancy(buildingId, input),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("ساکن به واحد وصل شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "اتصال ساکن ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function usePeriods(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.periods(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.listPeriods(buildingId)).data ?? [],
  });
}

export function useCreatePeriod(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (input: Parameters<typeof api.createPeriod>[1]) =>
      api.createPeriod(buildingId, input),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("دوره شارژ ایجاد شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "ایجاد دوره ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useIssuePeriod(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (periodId: string) => api.issuePeriod(buildingId, periodId),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("صورتحساب‌ها صادر شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "صدور شارژ ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useInvoices(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.invoices(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.listInvoices(buildingId)).data ?? [],
  });
}

export function usePayments(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.payments(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.listPayments(buildingId)).data ?? [],
  });
}

export function useCreatePayment(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (input: Parameters<typeof api.createPayment>[1]) =>
      api.createPayment(buildingId, input),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("پرداخت ثبت شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "ثبت پرداخت ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useConfirmPayment(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (paymentId: string) =>
      api.confirmPayment(buildingId, paymentId),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("پرداخت تأیید شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "تأیید پرداخت ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useRejectPayment(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (paymentId: string) =>
      api.rejectPayment(buildingId, paymentId),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("پرداخت رد شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "رد پرداخت ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useExpenses(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.expenses(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.listExpenses(buildingId)).data ?? [],
  });
}

export function useCreateExpense(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (input: Parameters<typeof api.createExpense>[1]) =>
      api.createExpense(buildingId, input),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("هزینه ثبت شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "ثبت هزینه ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useTickets(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.tickets(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.listTickets(buildingId)).data ?? [],
  });
}

export function useCreateTicket(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (input: Parameters<typeof api.createTicket>[1]) =>
      api.createTicket(buildingId, input),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("درخواست ثبت شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "ثبت درخواست ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useUpdateTicketStatus(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: ({
      ticketId,
      status,
    }: {
      ticketId: string;
      status: TicketStatus;
    }) => api.updateTicketStatus(buildingId, ticketId, status),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("وضعیت درخواست به‌روز شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "به‌روزرسانی ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useAnnouncements(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.announcements(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.listAnnouncements(buildingId)).data ?? [],
  });
}

export function useCreateAnnouncement(buildingId: string) {
  const invalidate = useBuildingScopedInvalidation(buildingId);
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (input: Parameters<typeof api.createAnnouncement>[1]) =>
      api.createAnnouncement(buildingId, input),
    onSuccess: async () => {
      await invalidate();
      enqueueSnackbar("اعلان منتشر شد", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(
        error instanceof ApiError ? error.message : "انتشار اعلان ناموفق بود",
        { variant: "error" },
      );
    },
  });
}

export function useOverview(buildingId: string) {
  return useQuery({
    queryKey: queryKeys.bms.overview(buildingId),
    enabled: Boolean(buildingId),
    queryFn: async () => (await api.getOverview(buildingId)).data!,
  });
}
