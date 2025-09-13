"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/Calen";
import type { Rover } from "@/lib/nasa";

interface FiltersProps {
  rover: string;
  camera: string;
  date: string;
  allRovers: Rover[]; // 1. Recebe a lista dinâmica de rovers
}

export default function Filters({ rover, camera, date, allRovers }: FiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleRoverChange = (newRover: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("rover", newRover);
    // Ao trocar o rover, remove o parâmetro da câmera para que o usuário possa escolher uma válida
    params.delete("camera");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    handleFilterChange("date", newDate ? newDate.toISOString().split("T")[0] : "");
  };

  // 2. Encontra as câmeras do rover selecionado de forma mais segura
  const availableCameras = (allRovers.find(r => r.name.toLowerCase() === rover.toLowerCase())?.cameras) || [];

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <DatePicker 
        date={date ? new Date(date) : undefined} 
        onDateChange={handleDateChange} 
      />

      {/* 3. Popula o select de rovers dinamicamente */}
      <Select value={rover} onValueChange={handleRoverChange}>
        <SelectTrigger className="w-[180px] bg-transparent border border-white/30 hover:bg-white/10 backdrop-blur-sm">
          <SelectValue placeholder="Rover" />
        </SelectTrigger>
        <SelectContent>
          {allRovers.map((r) => (
            <SelectItem key={r.id} value={r.name.toLowerCase()}>
              {r.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 4. Popula o select de câmeras dinamicamente */}
      <Select value={camera} onValueChange={(value) => handleFilterChange("camera", value)} disabled={availableCameras.length === 0}>
        <SelectTrigger className="w-[180px] bg-transparent border border-white/30 hover:bg-white/10 backdrop-blur-sm">
          <SelectValue placeholder="Camera" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cameras</SelectItem>
          {availableCameras.map((c) => (
            <SelectItem key={c.name} value={c.name.toLowerCase()}>
              {c.full_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
