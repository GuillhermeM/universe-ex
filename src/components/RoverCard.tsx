import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RoverImage = {
  src: string;
  rover: string;
  camera: string;
  date: string;
};

export function RoverCard({ src, rover, camera, date }: RoverImage) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-white/30 bg-white/10 backdrop-blur-sm">
      {/* Imagem */}
      <div className="w-full h-48 overflow-hidden">
        <Image src={src} alt={rover} width={300} height={200} className="w-full h-full object-cover" />
      </div>

      {/* Cabeçalho */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{rover}</CardTitle>
      </CardHeader>

      {/* Conteúdo */}
      <CardContent className="text-sm space-y-1">
        <p>
          <span className="font-medium">Camera:</span> {camera}
        </p>
        <p>
          <span className="font-medium">Date:</span> {date}
        </p>
      </CardContent>
    </Card>
  );
}
