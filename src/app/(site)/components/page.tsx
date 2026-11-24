"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

export default function ComponentsPage() {
  const [enabled, setEnabled] = useState(true);
  const [role, setRole] = useState("editor");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });
  const [remember, setRemember] = useState(false);
  const handleSave = () => {
    console.log(formData, role, remember);
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 560 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          کامپوننت‌ها
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          زمین بازی کوچکی از کنترل‌های رایج Material UI با تم پروژه.
        </Typography>
      </Box>

      <Alert severity="info">
        توکن‌های تم در <code>src/theme.ts</code> هستند. پالت و overrideها را آنجا
        گسترش دهید.
      </Alert>

      <TextField
        label="نام کامل"
        placeholder="نام شما"
        type="text"
        fullWidth
        size="small"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="ایمیل"
        placeholder="ایمیل شما"
        type="email"
        fullWidth
        size="small"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        select
        label="نقش"
        value={role}
        onChange={(event) => setRole(event.target.value)}
        fullWidth
      >
        <MenuItem value="admin">مدیر</MenuItem>
        <MenuItem value="editor">ویراستار</MenuItem>
        <MenuItem value="viewer">بیننده</MenuItem>
      </TextField>
      <TextField
        label="یادداشت"
        placeholder="یادداشت اختیاری"
        multiline
        minRows={3}
        fullWidth
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />

      <FormControlLabel
        control={
          <Switch
            checked={enabled}
            onChange={(event) => setEnabled(event.target.checked)}
          />
        }
        label="اعلان‌های ایمیل"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
        }
        label="مرا به خاطر بسپار"
      />

      <Stack direction="row" spacing={1.5}>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveRoundedIcon />}
        >
          ذخیره تغییرات
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFormData({ name: "", email: "", notes: "" })}
        >
          انصراف
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setFormData({ name: "", email: "", notes: "" })}
        >
          بازنشانی
        </Button>
      </Stack>
    </Stack>
  );
}
