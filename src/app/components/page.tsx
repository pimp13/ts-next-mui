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

      <TextField label="Full name" placeholder="Your name" type="text" fullWidth style={{ width: '50%' }} size="small" />
      <TextField label="Full name" placeholder="Your name" type="text" fullWidth />
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
        control={<Checkbox defaultChecked />}
        label="Remember me"
      />

      <Stack direction="row" spacing={1.5}>
        <Button variant="contained" startIcon={<SaveRoundedIcon />}>
          Save changes
        </Button>
        <Button variant="outlined">Cancel</Button>
        <Button variant="text" color="secondary">
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
