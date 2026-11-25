"use client";

import { createAuroraGradient } from "@/lib/gradient-generator";
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import {
  Box,
  MenuList,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { DropdownMenuExample } from "./components/dropdown-menu-example";
import { useTest } from "./hooks/use-test";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function TestPage() {
  const { data: articles, isLoading: isLoadingArticles } = useTest();

  const testPageTitle = "سلام به دنیا!";

  return (
    <Stack spacing={2}>
      <Box>
        <Typography
          variant="h2"
          sx={{ fontSize: "1.5rem", fontWeight: 500, mb: 1 }}
        >
          {testPageTitle}
        </Typography>
        <Typography>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز{" "}
        </Typography>
        <Typography variant="caption" color="secondary">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Box
        sx={[
          {
            background: createAuroraGradient(
              "rgba(77, 163, 255, 0.18)",
              "rgba(147, 197, 253, 0.25)",
              "#F8FAFC",
            ),
            padding: 3,
            borderRadius: 2,
          },
          (theme) =>
            theme.applyStyles("dark", {
              background: createAuroraGradient(
                "rgba(77, 163, 255, 0.35)",
                "rgba(11, 107, 203, 0.25)",
                "#0A0F18",
              ),
            }),
        ]}
      >
        <Grid container spacing={2}>
          {isLoadingArticles
            ? Array.from({ length: 3 }).map((_, i) => (
                <Grid
                  key={`skeleton-${i}`}
                  size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent>
                      <Skeleton variant="rounded" height={200} />
                      <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
                      <Skeleton variant="text" width="90%" />
                      <Skeleton variant="text" width="40%" />
                    </CardContent>
                    <CardActions sx={{ mt: "auto", p: 2 }}>
                      <Skeleton variant="rectangular" width={100} height={36} />
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : articles?.map((article) => (
                <Grid key={article.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 14 }}
                      >
                        {"دسته‌بندی"}
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        {article.title}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        {article.author_name}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {article.excerpt}
                        {/* {article. && (
                          <>
                            <br />
                            <Typography
                              component="span"
                              sx={{
                                fontStyle: "italic",
                                mt: 1,
                                display: "block",
                              }}
                            >
                              "{article.quote}"
                            </Typography>
                          </>
                        )} */}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">بیشتر بخوانید</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>

      <Box
        sx={[
          {
            minHeight: 300,
            borderRadius: 3,
            p: 3,

            // Light Mode
            background: createAuroraGradient(
              "rgba(59, 130, 246, 0.18)",
              "rgba(168, 85, 247, 0.15)",
              "#F8FAFC",
            ),
          },
          (theme) =>
            theme.applyStyles("dark", {
              // Dark Mode
              background: createAuroraGradient(
                "rgba(59, 130, 246, 0.35)",
                "rgba(168, 85, 247, 0.3)",
                "#0F172A",
              ),
            }),
        ]}
      >
        <Grid container spacing={2}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Word of the Day
                  </Typography>
                  <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    adjective
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ⌘X
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ⌘C
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ⌘V
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Web Clipboard</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Box>

      <DropdownMenuExample />
      <Box sx={{ pb: 100 }} />
      <Box>
        <Typography variant="h2">Tooltip</Typography>
        <Tooltip title="This is tooltip">
          <Button variant="contained" color="primary">
            Tooltip
          </Button>
        </Tooltip>
      </Box>
    </Stack>
  );
}
