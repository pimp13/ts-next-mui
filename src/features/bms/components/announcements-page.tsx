"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { BuildingSelector } from "@/features/bms/components/building-selector";
import { useBuildingContext } from "@/features/bms/hooks/use-building-context";
import {
  useAnnouncements,
  useCreateAnnouncement,
} from "@/features/bms/hooks/use-bms";

export function AnnouncementsPage() {
  const { buildingId } = useBuildingContext();
  const announcementsQuery = useAnnouncements(buildingId);
  const createAnnouncement = useCreateAnnouncement(buildingId);
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: { title: "", body: "", pinned: false },
  });

  return (
    <Stack spacing={2.5}>
      <BuildingSelector />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
        spacing={2}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            اعلان‌ها
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            اطلاعیه‌های ساختمان برای ساکنین
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={!buildingId}
          onClick={() => setOpen(true)}
        >
          اعلان جدید
        </Button>
      </Stack>

      <Stack spacing={2}>
        {(announcementsQuery.data ?? []).map((item) => (
          <Card key={item.id} variant="outlined">
            <CardContent>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                    {item.title}
                  </Typography>
                  {item.pinned ? (
                    <Chip size="small" color="primary" label="سنجاق‌شده" />
                  ) : null}
                </Stack>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {item.body}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.createdAt).toLocaleString("fa-IR")}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
        {!announcementsQuery.isLoading &&
        (announcementsQuery.data?.length ?? 0) === 0 ? (
          <Typography color="text.secondary">اعلانی ثبت نشده است.</Typography>
        ) : null}
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>اعلان جدید</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            id="announcement-form"
            spacing={2}
            sx={{ mt: 1 }}
            onSubmit={form.handleSubmit((values) => {
              createAnnouncement.mutate(values, {
                onSuccess: () => setOpen(false),
              });
            })}
          >
            <TextField label="عنوان" fullWidth {...form.register("title")} />
            <TextField
              label="متن"
              fullWidth
              multiline
              minRows={4}
              {...form.register("body")}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.watch("pinned")}
                  onChange={(e) => form.setValue("pinned", e.target.checked)}
                />
              }
              label="سنجاق در بالای لیست"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>انصراف</Button>
          <Button type="submit" form="announcement-form" variant="contained">
            انتشار
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
