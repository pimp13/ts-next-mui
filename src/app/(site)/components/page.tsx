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
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 560 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Components
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          A small playground of common Material UI controls using the project
          theme.
        </Typography>
      </Box>

      <Alert severity="info">
        Theme tokens live in <code>src/theme.ts</code>. Extend palette and
        component overrides there.
      </Alert>

      <TextField label="Full name" placeholder="Your name" type="text" fullWidth size="small"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <TextField label="Email" placeholder="Your email" type="email" fullWidth size="small"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <TextField
        select
        label="Role"
        value={role}
        onChange={(event) => setRole(event.target.value)}
        fullWidth
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="editor">Editor</MenuItem>
        <MenuItem value="viewer">Viewer</MenuItem>
      </TextField>
      <TextField
        label="Notes"
        placeholder="Optional notes"
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
        label="Email notifications"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
        }
        label="Remember me"
      />

      <Stack direction="row" spacing={1.5}>
        <Button onClick={handleSave} variant="contained" startIcon={<SaveRoundedIcon />}>
          Save changes
        </Button>
        <Button variant="outlined" onClick={() => setFormData({ name: "", email: "", notes: "" })}>Cancel</Button>
        <Button variant="text" color="secondary" onClick={() => setFormData({ name: "", email: "", notes: "" })}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
