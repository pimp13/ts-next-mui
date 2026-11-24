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
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import Link from "@/components/Link";

const features = [
  {
    title: "Material UI",
    description:
      "کامپوننت‌های آماده تولید، تم‌بندی و دسترس‌پذیری در همه کنترل‌ها.",
    icon: <WidgetsRoundedIcon color="primary" />,
  },
  {
    title: "آماده برای App Router",
    description:
      "کش Emotion با @mui/material-nextjs تا استایل‌های SSR با Next.js ۱۶ هم‌خوان بمانند.",
    icon: <SpeedRoundedIcon color="primary" />,
  },
  {
    title: "توکن‌های طراحی",
    description:
      "پالت، تایپوگرافی و شکل‌ها در یک فایل تم متمرکز و قابل گسترش.",
    icon: <DesignServicesRoundedIcon color="primary" />,
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
            label="typescript-next-mui"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(255,255,255,0.12)",
              color: "common.white",
            }}
          />
          <Typography variant="h2" component="h1">
            فان‌لایف MUI
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.78)", fontWeight: 400 }}
          >
            استارتر ادمین Material UI با React Hook Form، React Query و API
            گویی روی پورت ۸۰۸۰.
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
              ورود به داشبورد
            </Button>
            <Button
              component={Link}
              href="/components"
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
              مشاهده کامپوننت‌ها
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
                <Button component={Link} href="/components" size="small">
                  مشاهده
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
