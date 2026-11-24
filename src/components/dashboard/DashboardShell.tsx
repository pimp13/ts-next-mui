"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import Link from "@/components/Link";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";

const DRAWER_WIDTH = 260;

const navItems = [
  {
    href: "/dashboard",
    label: "نمای کلی",
    icon: <DashboardRoundedIcon />,
  },
  {
    href: "/dashboard/users",
    label: "کاربران",
    icon: <PeopleRoundedIcon />,
  },
  {
    href: "/dashboard/articles",
    label: "مقالات",
    icon: <ArticleRoundedIcon />,
  },
] as const;

type DashboardShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function DashboardShell({
  title,
  description,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: user } = useCurrentUser();

  const drawer = (
    <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <Toolbar sx={{ px: 2 }}>
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{ fontWeight: 700, color: "inherit", textDecoration: "none" }}
        >
          پنل فان‌لایف
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, px: 1 }}>
        {navItems.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={active}
              onClick={() => setMobileOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {user?.name ?? "مهمان"}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {user?.email ?? "برای مدیریت وارد شوید"}
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          <LogoutButton variant="fullWidth" />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 1, display: { md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            {description ? (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {description}
              </Typography>
            ) : null}
          </Box>
          <ThemeToggle />
          <LogoutButton variant="icon" />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          // With stylis-plugin-rtl, left/right CSS is flipped — use "left"
          // so the paper ends up on the physical right.
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          anchor="left"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              borderRight: 1,
              borderColor: "divider",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          bgcolor: "background.default",
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
