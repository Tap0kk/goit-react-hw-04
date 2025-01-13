const API_KEY = 'u4SbKyr8za1VfFcjgEfAFrylY29swmSkXaT_kKhptCM';
const BASE_URL = 'https://api.unsplash.com/';

export const fetchImages = async (query, page = 1) => {
  const perPage = 21;
  const response = await fetch(
    `${BASE_URL}/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  return data.results;
};
