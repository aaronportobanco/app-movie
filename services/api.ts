export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    // La cabecera Authorization es para la API v4, pero estás usando endpoints v3.
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {

  // Para los endpoints v3, la clave de API debe ir como parámetro en la URL.
  const apiKeyParam = `api_key=${TMDB_CONFIG.API_KEY}`;

  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?${apiKeyParam}&query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?${apiKeyParam}&sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Muestra el error de la API de TMDB en la consola
    console.error("Error de la API de TMDB:", errorData);
    //@ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  const data = await response.json();
  return data.results;
};
