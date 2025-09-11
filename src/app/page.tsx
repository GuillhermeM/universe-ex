import React from "react";
import "./globals.css";
import { cn } from "@/lib/utils";
import GalleryContainer from "@/components/GalleryContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome Universe Ex 🌌</h1>
      <GalleryContainer />
    </main>
  );
}
