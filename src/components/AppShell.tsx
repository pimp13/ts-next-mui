"use client";

import { useState, type ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import Link from "@/components/Link";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";

const navItems = [
  { href: "/", label: "خانه", icon: <HomeRoundedIcon /> },
  { href: "/dashboard", label: "داشبورد", icon: <DashboardRoundedIcon /> },
  { href: "/components", label: "کامپوننت‌ها", icon: <WidgetsRoundedIcon /> },
] as const;

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [open, setOpen] = useState(false);
  const { data: user } = useCurrentUser();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="باز کردن منو"
            onClick={() => setOpen(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            مدیریت ساختمان
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
            {user ? (
              <LogoutButton />
            ) : (
              <Button component={Link} href="/login" color="inherit" startIcon={<LoginRoundedIcon />}>
                ورود
              </Button>
            )}
          </Box>
          <ThemeToggle />
          {user ? (
            <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
              <LogoutButton variant="icon" />
            </Box>
          ) : null}
        </Toolbar>
      </AppBar>

      <Drawer
        // stylis-plugin-rtl flips left/right — "left" lands on physical right
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: 280 } } }}
      >
        <Toolbar>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            منو
          </Typography>
        </Toolbar>
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
          {!user ? (
            <ListItemButton
              component={Link}
              href="/login"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <LoginRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="ورود" />
            </ListItemButton>
          ) : null}
        </List>
        {user ? (
          <Box sx={{ p: 2 }}>
            <LogoutButton variant="fullWidth" />
          </Box>
        ) : null}
      </Drawer>

      <Box component="main" sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: "divider",
          py: 2.5,
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            مدیریت ساختمان · شارژ، واحدها، درخواست‌ها
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
