import { Card, CardContent } from "@/components/ui/card";
import { Camera, CalendarDays } from "lucide-react";
import Image from "next/image";

type RoverImage = {
  src: string;
  rover: string;
  camera: string;
  date: string;
};

export function RoverCard({ src, rover, camera, date }: RoverImage) {
  return (
    <Card className="group relative overflow-hidden rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="overflow-hidden h-48 w-full relative">
        <img
          src={src}
          alt={rover}
          width={400}
          className="h-full w-full object-fit transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <div className="mb-2 space-y-2 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-white/70" />
            <span className="truncate">Camera: {camera}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-white/70" />
            <span>Data: {date}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold tracking-tight">Rover: {rover}</h3>
      </div>
    </Card>
  );
}
export { Card };
