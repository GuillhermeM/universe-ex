"use server";

export async function fetchMarsPhotos(
  rover: string,
  camera: string,
  date: string,
    page: number
 ) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY is not defined in environment variables");
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
        console.error("fetchMarsPhotos error: ", error);
        return [];
    }
}