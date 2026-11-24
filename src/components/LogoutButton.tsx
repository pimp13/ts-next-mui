"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useCurrentUser, useLogout } from "@/features/auth/hooks/use-auth";

type LogoutButtonProps = {
  variant?: "button" | "icon" | "fullWidth";
};

export function LogoutButton({ variant = "button" }: LogoutButtonProps) {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  if (isLoading || !user) {
    return null;
  }

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => router.push("/login"),
    });
  };

  if (variant === "icon") {
    return (
      <Tooltip title="خروج">
        <span>
          <IconButton
            color="inherit"
            aria-label="خروج"
            disabled={logoutMutation.isPending}
            onClick={handleLogout}
          >
            <LogoutRoundedIcon />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  return (
    <Button
      color="inherit"
      variant={variant === "fullWidth" ? "outlined" : "text"}
      fullWidth={variant === "fullWidth"}
      startIcon={<LogoutRoundedIcon />}
      disabled={logoutMutation.isPending}
      onClick={handleLogout}
    >
      {logoutMutation.isPending ? "در حال خروج..." : "خروج"}
    </Button>
  );
}
