"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { PaginationControls } from "./PaginationControls";
import Filters from "./Filters";
import { fetchMarsPhotos } from "@/lib/nasa";
import { RoverCard } from "@/components/RoverCard";
import type { MarsPhoto, Rover } from "@/lib/nasa";

export default function GalleryContainerWrapper({
  allRovers,
}: {
  allRovers: Rover[];
}) {
  return (
    <Suspense fallback={<div>Loading Filters...</div>}>
      <GalleryContainer allRovers={allRovers} />
    </Suspense>
  );
}

function GalleryContainer({ allRovers }: { allRovers: Rover[] }) {
  const searchParams = useSearchParams();

  const rover =
    searchParams.get("rover") ??
    allRovers[0]?.name.toLowerCase() ??
    "curiosity";
  const camera = searchParams.get("camera") ?? "";
  const date = searchParams.get("date") ?? "";
  const page = searchParams.get("page") ?? "1";

  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<MarsPhoto | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      setLoading(true);
      const pageNumber = parseInt(page, 10) || 1;
      const data = await fetchMarsPhotos(rover, camera, date, pageNumber);
      setPhotos(data);
      setLoading(false);
    }

    loadPhotos();
  }, [rover, camera, date, page]);

  const hasNextPage = photos.length === 25;

  return (
    <div className="w-full max-w-6xl">
      <div className="mb-8">
        <Filters
          rover={rover}
          camera={camera}
          date={date}
          allRovers={allRovers}
        />
      </div>

      {loading && <p className="text-center">Loading photos...</p>}
      {!loading && photos.length === 0 && (
        <p className="text-center">
          No photos found for the selected criteria.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="cursor-pointer group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <RoverCard
              src={photo.img_src}
              rover={photo.rover.name}
              camera={photo.camera.full_name}
              date={photo.earth_date}
            />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-w-3xl w-full p-4 relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedPhoto.img_src}
              alt={`Photo by ${selectedPhoto.rover.name} with ${selectedPhoto.camera.full_name}`}
              width={800}
              height={600}
              className="w-full h-auto mb-4 rounded-md"
            />
            <div className="text-sm">
              <p>
                <strong>Rover:</strong> {selectedPhoto.rover.name}
              </p>
              <p>
                <strong>Camera:</strong> {selectedPhoto.camera.full_name}
              </p>
              <p>
                <strong>Earth Date:</strong> {selectedPhoto.earth_date}
              </p>
            </div>
          </div>
        </div>
      )}

      <PaginationControls
        page={parseInt(page, 10) || 1}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
