'use client';

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";


const stats = [
  { label: "Active users", value: "1,284", change: "+12%", progress: 72 },
  { label: "Sessions", value: "8,402", change: "+4%", progress: 58 },
  { label: "Conversion", value: "3.8%", change: "+0.6%", progress: 38 },
] as const;

const activity = [
  { name: "Sara N.", action: "Published article draft", time: "12m ago" },
  { name: "Ali R.", action: "Updated board settings", time: "41m ago" },
  { name: "Mina K.", action: "Invited 3 teammates", time: "2h ago" },
] as const;

export default function DashboardPage() {
  const themeStorage = localStorage.getItem('theme');
  console.log(themeStorage);
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Sample Material UI dashboard cards and activity list.
        </Typography>

        <Box
          sx={{
            backgroundColor: {
              xs: "primary.main",
              md: 'secondary.main'
            },
            color: "white",
            padding: 2,
            borderRadius: 2,

            "&:hover": {
              backgroundColor: "primary.dark",
              cursor: "pointer",
            },

            "&:focus": {
              outline: "2px solid blue",
              border: "2px solid primary.dark"
            },

            "&:active": {
              backgroundColor: "primary.light",
            },


          }}
        >
          Hover Me
        </Box>
      </Box>

      <Grid container spacing={2.5}>
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1.5}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {stat.label}
                    </Typography>
                    <Chip
                      size="small"
                      color="success"
                      icon={<TrendingUpRoundedIcon />}
                      label={stat.change}
                    />
                  </Stack>
                  <Typography variant="h4">{stat.value}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={stat.progress}
                    sx={{ height: 8, borderRadius: 999 }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card variant="outlined" sx={{ grid: { xs: 10 } }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent activity
          </Typography>
          <Stack spacing={2}>
            {activity.map((item) => (
              <Stack
                key={`${item.name}-${item.time}`}
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {item.name.slice(0, 1)}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{ color: "text.secondary" }}
                  >
                    {item.action}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {item.time}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
