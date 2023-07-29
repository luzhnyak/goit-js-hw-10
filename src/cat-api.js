import axios from 'axios';

const API_KEY =
  'live_NFKKD7pLbJ1acajJ2qqjW85ySxYJkwsU208fB0UjsgAOIDcnMm1NxNz5szzsQaHh';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url)
    .then(response => {
      // Response handling
      return response.json();
    })
    .catch(error => {
      // Error handling
      return 'error';
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url)
    .then(response => {
      // Response handling
      return response.json();
    })
    .catch(error => {
      // Error handling
      return 'error';
    });
}
