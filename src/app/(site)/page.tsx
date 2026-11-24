'use client';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import Link from '@mui/material/Link';
import NextLink from '@/components/Link';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Alert, Avatar, CardActionArea, CardMedia, Divider, Paper, Rating, Skeleton } from "@mui/material";
import { useId, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const features = [
  {
    title: "شارژ و صندوق",
    description:
      "دوره شارژ، صورتحساب واحد، پرداخت و مانده صندوق به‌صورت شفاف و قابل پیگیری.",
    icon: <AccountBalanceWalletRoundedIcon color="primary" />,
  },
  {
    title: "واحدها و ساکنین",
    description:
      "ساختار ساختمان، مالک و مستأجر، نقش مدیر و هیئت‌مدیره در یک جا.",
    icon: <ApartmentRoundedIcon color="primary" />,
  },
  {
    title: "درخواست و اعلان",
    description:
      "تیکت تعمیرات، پیگیری وضعیت و اعلان‌های ساختمان برای همه ساکنین.",
    icon: <ConstructionRoundedIcon color="primary" />,
  },
] as const;

export default function HomePage() {
  const [value, setValue] = useState<number | null>(2);
  const id = useId();

  const fakeAvatarImg = 'https://img.magnific.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid&w=740&q=80';

  return (
    <Stack spacing={5}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 8 },
          color: "common.white",
          background:
            "radial-gradient(circle at 20% 20%, rgba(77,163,255,0.35), transparent 42%), linear-gradient(145deg, #0A0F18 0%, #121A27 48%, #0B6BCB 140%)",
        }}
      >
        <Stack
          spacing={2.5}
          sx={{ maxWidth: 640, position: "relative", zIndex: 1 }}
        >
          <Chip
            label="مدیریت ساختمان مسکونی"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(255,255,255,0.12)",
              color: "common.white",
            }}
          />
          <Typography variant="h2" component="h1">
            مدیریت ساختمان
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.78)", fontWeight: 400 }}
          >
            نرم‌افزاری که جای دفترچه و اکسل مدیر ساختمان می‌نشیند: شارژ، بدهی،
            هزینه مشترک، تعمیرات و اعلان‌ها.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              component={Link}
              href="/login"
              variant="contained"
              endIcon={<ArrowBackRoundedIcon />}
              size="large"
              sx={{
                bgcolor: "#FFFFFF",
                color: "#0A0F18",
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}
            >
              ورود به پنل
            </Button>
            <Button
              component={Link}
              href="/dashboard"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "common.white",
                "&:hover": {
                  borderColor: "common.white",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              مشاهده داشبورد
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={2.5}>
        {features.map((feature) => (
          <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Stack spacing={1.5}>
                  {feature.icon}
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {feature.description}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button component={Link} href="/dashboard" size="small">
                  ورود به پنل
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider />


      {/* Grid Example */}
      <Grid container spacing={2.5}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider />

      {/* Rating Example */}
      <Box sx={{ '& > legend': { mt: 2 } }}>
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Typography component="legend">Uncontrolled</Typography>
        <Rating
          name="simple-uncontrolled"
          onChange={(event, newValue) => {
            console.log(newValue);
          }}
          defaultValue={2}
        />
        <Typography component="legend">Read only</Typography>
        <Rating name="read-only" value={value} readOnly />
        <Typography component="legend">Disabled</Typography>
        <Rating name="disabled" value={value} disabled />
        <Typography component="legend">No rating given</Typography>
        <Rating name="no-value" value={null} />
      </Box>

      <Divider />

      <Avatar alt="Remy Sharp" src={fakeAvatarImg} />

      <Divider />

      <Stack direction="row" spacing={1}>
        <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
        <Chip
          avatar={<Avatar alt="Natacha" src={fakeAvatarImg} />}
          label="Avatar"
          variant="outlined"
        />

        <Chip label="Deletable" onDelete={() => { }} />
      </Stack>

      <Divider />


      <Stack direction="column" spacing={2}>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      </Stack>


      <Divider />

      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} width={210} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />


        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </Stack>



      <Divider />

      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls={`${id}-panel1-content`}
            id={`${id}-panel1-header`}
          >
            <Typography component="span">Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${id}-panel2-content`}
            id={`${id}-panel2-header`}
          >
            <Typography component="span">Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${id}-panel3-content`}
            id={`${id}-panel3-header`}
          >
            <Typography component="span">Accordion Actions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion>
      </Box>


      <Divider />

    </Stack>
  );
}
