"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { BuildingSelector } from "@/features/bms/components/building-selector";
import { useBuildingContext } from "@/features/bms/hooks/use-building-context";
import { useOverview } from "@/features/bms/hooks/use-bms";
import { formatMoney } from "@/features/bms/types";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";

export function BmsOverview() {
  const { data: user } = useCurrentUser();
  const { building, buildingId } = useBuildingContext();
  const overviewQuery = useOverview(buildingId);
  const summary = overviewQuery.data;

  const cards = [
    {
      label: "مانده صندوق",
      value: summary ? formatMoney(summary.balance) : "…",
      hint: summary
        ? `درآمد ${formatMoney(summary.confirmedPayments)} · هزینه ${formatMoney(summary.expenses)}`
        : "در حال بارگذاری",
      icon: <AccountBalanceWalletRoundedIcon color="primary" />,
    },
    {
      label: "بدهی باز",
      value: summary ? formatMoney(summary.outstandingInvoices) : "…",
      hint: summary
        ? `${summary.overdueInvoices} صورتحساب معوق`
        : "در حال بارگذاری",
      icon: <ReceiptLongRoundedIcon color="primary" />,
    },
    {
      label: "درخواست‌های باز",
      value: summary ? String(summary.openTickets) : "…",
      hint: "تعمیرات و خدمات در جریان",
      icon: <ConstructionRoundedIcon color="primary" />,
    },
    {
      label: "هشدار معوق",
      value: summary ? String(summary.overdueInvoices) : "…",
      hint: "واحدهایی که موعد پرداخت گذشته",
      icon: <WarningAmberRoundedIcon color="warning" />,
    },
  ];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          خوش آمدید{user ? `، ${user.name}` : ""}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {building
            ? `نمای عملیاتی «${building.name}»`
            : "سامانه مدیریت ساختمان مسکونی"}
        </Typography>
      </Box>

      <BuildingSelector />

      <Grid container spacing={2.5}>
        {cards.map((card) => (
          <Grid key={card.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1.25}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {card.label}
                    </Typography>
                    {card.icon}
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {card.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {card.hint}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
