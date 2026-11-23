import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import Link from "@/components/Link";

const features = [
  {
    title: "Material UI",
    description:
      "Production-ready components, theming, and accessibility built into every control.",
    icon: <WidgetsRoundedIcon color="primary" />,
  },
  {
    title: "App Router ready",
    description:
      "Emotion cache via @mui/material-nextjs so SSR styles stay in sync with Next.js 16.",
    icon: <SpeedRoundedIcon color="primary" />,
  },
  {
    title: "Design tokens",
    description:
      "Shared palette, typography, and shape live in one theme file you can extend.",
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
            "linear-gradient(135deg, #0F766E 0%, #0D5C56 48%, #134E4A 100%)",
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
              bgcolor: "rgba(255,255,255,0.16)",
              color: "common.white",
            }}
          />
          <Typography variant="h2" component="h1">
            Funlife MUI
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.86)", fontWeight: 400 }}
          >
            Material UI admin starter with React Hook Form, React Query, and
            the Go API on port 8080.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
          >
            <Button
              component={Link}
              href="/login"
              variant="contained"
              color="secondary"
              endIcon={<ArrowForwardRoundedIcon />}
              size="large"
            >
              Sign in to dashboard
            </Button>
            <Button
              component={Link}
              href="/components"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "rgba(255,255,255,0.5)",
                color: "common.white",
                "&:hover": {
                  borderColor: "common.white",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Browse components
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
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
