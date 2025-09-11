interface Props {
  photos: any[];
}

export function Gallery({ photos }: Props) {
  if (!photos || photos.length === 0) {
    return <p className="text-center">No photos available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((p) => (
        <div key={p.id} className="border rounded overflow-hidden">
          <img
            src={p.img_src}
            alt={`Photo taken by ${p.id}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-2">
            <p>
              <strong>Rover:</strong> {p.rover.name}
            </p>
            <p>
              <strong>Camera:</strong> {p.camera.full_name} ({p.camera.name})
            </p>
            <p>
              <strong>Data:</strong> {p.earth_date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
