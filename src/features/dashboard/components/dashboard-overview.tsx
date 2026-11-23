"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { useArticles } from "@/features/articles/hooks/use-articles";
import { useUsers } from "@/features/users/hooks/use-users";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";

export function DashboardOverview() {
  const { data: user } = useCurrentUser();
  const usersQuery = useUsers({});
  const articlesQuery = useArticles({});

  const users = usersQuery.data ?? [];
  const articles = articlesQuery.data ?? [];
  const published = articles.filter((item) => item.status === "published");
  const drafts = articles.filter((item) => item.status === "draft");

  const cards = [
    {
      label: "Users",
      value: usersQuery.isLoading ? "…" : String(users.length),
      hint: "Accounts from Go /users",
      icon: <PeopleRoundedIcon color="primary" />,
      progress: Math.min(users.length * 8, 100),
    },
    {
      label: "Articles",
      value: articlesQuery.isLoading ? "…" : String(articles.length),
      hint: "All editorial records",
      icon: <ArticleRoundedIcon color="primary" />,
      progress: Math.min(articles.length * 10, 100),
    },
    {
      label: "Published",
      value: articlesQuery.isLoading ? "…" : String(published.length),
      hint: `${drafts.length} drafts remaining`,
      icon: <PublishRoundedIcon color="primary" />,
      progress:
        articles.length === 0
          ? 0
          : Math.round((published.length / articles.length) * 100),
    },
  ] as const;

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Welcome{user ? `, ${user.name}` : ""}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Live overview from the Go API using React Query.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {cards.map((card) => (
          <Grid key={card.label} size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1.5}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {card.label}
                    </Typography>
                    {card.icon}
                  </Stack>
                  <Typography variant="h4">{card.value}</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {card.hint}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={card.progress}
                    sx={{ height: 8, borderRadius: 999 }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {(usersQuery.isError || articlesQuery.isError) && (
        <Card variant="outlined">
          <CardContent>
            <Typography color="error">
              Could not load some dashboard data. Sign in with an account that
              has users/articles permissions (cookie auth against :8080).
            </Typography>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
