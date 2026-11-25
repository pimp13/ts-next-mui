import { Box, Divider, Stack, Typography } from "@mui/material";

export default function TestPage() {
  const testPageTitle = "سلام به دنیا!";
  return (
    <Stack>
      <Box sx={{ pb: 2 }}>
        <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 500, mb: 1 }}>
          {testPageTitle}
        </Typography>
        <Typography>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز </Typography>
        <Typography variant="caption" color="secondary">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Box>
      
      </Box>
    </Stack>
  )
}