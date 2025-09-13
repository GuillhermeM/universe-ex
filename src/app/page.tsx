import GalleryContainer from "@/components/GalleryContainer";
import { fetchRovers } from "@/lib/nasa";

export default async function Home() {
  const allRovers = await fetchRovers();

  if (!allRovers || allRovers.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-br from-black via-indigo-950 to-purple-900 text-white">
        <div className="text-center p-8 border border-red-500/50 bg-red-500/10 rounded-lg">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Failed to Load Rover Data
          </h1>
          <p className="text-red-200">
            Could not connect to the NASA API. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-gradient-to-br from-black via-indigo-950 to-purple-900 text-white">
      <h1 className="text-4xl font-bold mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        UniverseEx Mars Rover Photos
      </h1>
      <GalleryContainer allRovers={allRovers} />
    </main>
  );
}
