import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import Link from "@/components/Link";

const features = [
  {
    title: "شارژ و صندوق",
    description:
      "دوره شارژ، صورتحساب واحد، پرداخت و مانده صندوق به‌صورت شفاف و قابل پیگیری.",
    icon: <AccountBalanceWalletRoundedIcon color="primary" />,
  },
  {
    title: "واحدها و ساکنین",
    description:
      "ساختار ساختمان، مالک و مستأجر، نقش مدیر و هیئت‌مدیره در یک جا.",
    icon: <ApartmentRoundedIcon color="primary" />,
  },
  {
    title: "درخواست و اعلان",
    description:
      "تیکت تعمیرات، پیگیری وضعیت و اعلان‌های ساختمان برای همه ساکنین.",
    icon: <ConstructionRoundedIcon color="primary" />,
  },
] as const;

export default function HomePage() {
  return (
    <Stack spacing={5}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 8 },
          color: "common.white",
          background:
            "radial-gradient(circle at 20% 20%, rgba(77,163,255,0.35), transparent 42%), linear-gradient(145deg, #0A0F18 0%, #121A27 48%, #0B6BCB 140%)",
        }}
      >
        <Stack
          spacing={2.5}
          sx={{ maxWidth: 640, position: "relative", zIndex: 1 }}
        >
          <Chip
            label="مدیریت ساختمان مسکونی"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(255,255,255,0.12)",
              color: "common.white",
            }}
          />
          <Typography variant="h2" component="h1">
            مدیریت ساختمان
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.78)", fontWeight: 400 }}
          >
            نرم‌افزاری که جای دفترچه و اکسل مدیر ساختمان می‌نشیند: شارژ، بدهی،
            هزینه مشترک، تعمیرات و اعلان‌ها.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              component={Link}
              href="/login"
              variant="contained"
              endIcon={<ArrowBackRoundedIcon />}
              size="large"
              sx={{
                bgcolor: "#FFFFFF",
                color: "#0A0F18",
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}
            >
              ورود به پنل
            </Button>
            <Button
              component={Link}
              href="/dashboard"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "common.white",
                "&:hover": {
                  borderColor: "common.white",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              مشاهده داشبورد
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={2.5}>
        {features.map((feature) => (
          <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Stack spacing={1.5}>
                  {feature.icon}
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {feature.description}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button component={Link} href="/dashboard" size="small">
                  ورود به پنل
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
