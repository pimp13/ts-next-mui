"use client";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import SettingsBrightnessRoundedIcon from "@mui/icons-material/SettingsBrightnessRounded";
import { useColorScheme } from "@mui/material/styles";

const cycle = ["system", "light", "dark"] as const;

const modeLabel = {
  system: "تم سیستم",
  light: "تم روشن",
  dark: "تم تاریک",
} as const;

const nextLabel = {
  system: "روشن",
  light: "تاریک",
  dark: "سیستم",
} as const;

export function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return (
      <IconButton color="inherit" aria-label="تغییر تم" disabled>
        <SettingsBrightnessRoundedIcon />
      </IconButton>
    );
  }

  const next = cycle[(cycle.indexOf(mode) + 1) % cycle.length];

  return (
    <Tooltip title={`${modeLabel[mode]} · کلیک برای ${nextLabel[mode]}`}>
      <IconButton
        color="inherit"
        aria-label={`تم: ${modeLabel[mode]}. تغییر به ${nextLabel[mode]}`}
        onClick={() => setMode(next)}
      >
        {mode === "dark" ? (
          <DarkModeRoundedIcon />
        ) : mode === "light" ? (
          <LightModeRoundedIcon />
        ) : (
          <SettingsBrightnessRoundedIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
