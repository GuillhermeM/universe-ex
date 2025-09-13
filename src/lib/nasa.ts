'use server';

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


export async function fetchRovers(): Promise<Rover[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error('API_KEY for NASA is not defined in environment variables');
    throw new Error('NASA API Key is not configured.');
  }
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${apiKey}`;

  try {
    
    const res = await fetch(url, { next: { revalidate: 86400 } }); 
    if (!res.ok) {
      throw new Error(`Failed to fetch rovers: ${res.statusText}`);
    }
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
): Promise<MarsPhoto[]> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY is not defined in environment variables');
  }
  
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.toLowerCase()}/photos?api_key=${apiKey}&page=${page}`;

  if (date) {
    url += `&earth_date=${date}`;
  }
  
  if (camera && camera.toLowerCase() !== 'all') {
    url += `&camera=${camera.toLowerCase()}`;
  }

  try {
    const res = await fetch(url);
     if (!res.ok) {
      throw new Error(`Failed to fetch photos: ${res.statusText}`);
    }
    const data = await res.json();
    return data.photos || [];
  } catch (error) {
    console.error('fetchMarsPhotos error: ', error);
    return [];
  }
}
