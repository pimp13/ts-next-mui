"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listBuildings } from "@/features/bms/api";
import { queryKeys } from "@/lib/query/keys";

const STORAGE_KEY = "funlife-bms-building-id";

export function useBuildingContext() {
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setSelectedId(saved);
  }, []);

  const buildingsQuery = useQuery({
    queryKey: queryKeys.bms.buildings,
    queryFn: async () => {
      const response = await listBuildings();
      return response.data ?? [];
    },
  });

  const buildings = buildingsQuery.data ?? [];

  const buildingId = useMemo(() => {
    if (selectedId && buildings.some((item) => item.id === selectedId)) {
      return selectedId;
    }
    return buildings[0]?.id ?? "";
  }, [buildings, selectedId]);

  const building = buildings.find((item) => item.id === buildingId) ?? null;

  const selectBuilding = (id: string) => {
    setSelectedId(id);
    window.localStorage.setItem(STORAGE_KEY, id);
  };

  return {
    buildings,
    building,
    buildingId,
    selectBuilding,
    isLoading: buildingsQuery.isLoading,
    isError: buildingsQuery.isError,
    refetch: buildingsQuery.refetch,
  };
}
