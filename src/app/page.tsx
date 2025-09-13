import GalleryContainer from "@/components/GalleryContainer";
import { fetchRovers } from "@/lib/nasa";

// 1. A página agora é uma função async
export default async function Home({ searchParams, }: { searchParams?: { [key: string]: string | undefined }; }) {

  // 2. Buscamos os dados dos rovers no servidor
  const allRovers = await fetchRovers();

  const rover = searchParams?.rover ?? allRovers[0]?.name ?? "curiosity"; // Padrão para o primeiro rover da lista
  const camera = searchParams?.camera ?? ""; // Câmera pode começar vazia
  const date = searchParams?.date ?? ""; // Data pode começar vazia
  const page = searchParams?.page ?? "1";

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-gradient-to-br from-black via-indigo-950 to-purple-900 text-white">
      <h1 className="text-4xl font-bold mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        UniverseEx Mars Rover Photos
      </h1>
      {/* 3. Passamos a lista de rovers para o container */}
      <GalleryContainer 
        rover={rover} 
        camera={camera} 
        date={date} 
        page={page} 
        allRovers={allRovers}
      />
    </main>
  );
}
