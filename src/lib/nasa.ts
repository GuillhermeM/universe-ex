'use server';

// Adicionando a definição de tipo que estava faltando
export type MarsPhoto = {
  id: number;
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
};

// Tipos para os dados dos rovers
export type RoverCamera = {
  name: string;
  full_name: string;
};

export type Rover = {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: RoverCamera[];
};

// Nova função para buscar a lista de rovers
export async function fetchRovers(): Promise<Rover[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY is not defined in environment variables');
  }
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache por 1 hora
    const data = await res.json();
    return data.rovers || [];
  } catch (error) {
    console.error('fetchRovers error: ', error);
    return [];
  }
}

export async function fetchMarsPhotos(
  rover: string,
  camera: string,
  date: string,
  page: number
) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY is not defined in environment variables');
  }
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${apiKey}&page=${page}`;

  if (camera) {
    url += `&camera=${camera}`;
  }
  if (date) {
    url += `&earth_date=${date}`;
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.photos || [];
  } catch (error) {
    console.error('fetchMarsPhotos error: ', error);
    return [];
  }
}