import { Box, Typography, Button } from "@mui/material";

export default function UserPage() {
  return (
    <Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="primary">Add User</Button>
      </Box>
    </Box>
  );
}