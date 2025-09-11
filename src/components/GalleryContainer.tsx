"use client";

import { useState, useEffect } from "react";
import { PaginationControls } from "./PaginationControls";
import { fetchMarsPhotos } from "@/lib/nasa";

export default function GalleryContainer() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [rover, setRover] = useState("curiosity");
  const [camera, setCamera] = useState("fhaz");
  const [date, setDate] = useState("2015-12-10");
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  async function loadPhotos() {
    setLoading(true);
    const data = await fetchMarsPhotos(rover, camera, date, page);
    setPhotos(data);
    setLoading(false);
    setHasNextPage(data.length > 0);
  }

  useEffect(() => {
    loadPhotos();
  }, [page, rover, camera, date]);

  return (
    <div className="w-full">
      {loading && <p>Loading...</p>}
      {!loading && photos.length === 0 && <p>No photos found.</p>}

      <div className="grid grid-cols-3 gap-4 mb-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-w-4 aspect-h-3 cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.img_src}
              alt={photo.rover.name}
              className="w-full h-auto"
            />
            <div className="p-2 text-sm">
              <p>Rover: {photo.rover.name}</p>
              <p>Camera: {photo.camera.full_name}</p>
              <p>Date: {photo.earth_date}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded shadow-lg max-w-2xl w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Fechar"
            >
              &times;
            </button>
            <img
              src={selectedPhoto.img_src}
              alt={selectedPhoto.rover.name}
              className="w-full h-auto mb-4 rounded"
            />
            <div className="text-sm">
              <p>
                <strong>Rover:</strong> {selectedPhoto.rover.name}
              </p>
              <p>
                <strong>Camera:</strong> {selectedPhoto.camera.full_name}
              </p>
              <p>
                <strong>Date:</strong> {selectedPhoto.earth_date}
              </p>
            </div>
          </div>
        </div>
      )}

      <PaginationControls
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
