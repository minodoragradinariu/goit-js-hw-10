const API_KEY =
  'live_ma0X6AFhZcwiqjiNNSXx1dXp93kvvKItgUHQln9CzXlaCQvsGzyG5QdB9gSOgo6D';
const BASE_URL = 'https://api.thecatapi.com/v1';
const BREEDS_URL = `${BASE_URL}/breeds`;
const CAT_INFO_URL = `${BASE_URL}/images/search`;

const headers = {
  'x-api-key': API_KEY,
};

export async function fetchBreeds() {
  const response = await fetch(BREEDS_URL, { headers });
  if (!response.ok) throw new Error('Failed to fetch breeds');
  return await response.json();
}

export async function fetchCatByBreed(breedId) {
  const response = await fetch(`${CAT_INFO_URL}?breed_ids=${breedId}`, {
    headers,
  });
  if (!response.ok) throw new Error('Failed to fetch cat info');
  return await response.json();
}
