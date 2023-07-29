import axios from 'axios';

API_KEY =
  'live_NFKKD7pLbJ1acajJ2qqjW85ySxYJkwsU208fB0UjsgAOIDcnMm1NxNz5szzsQaHh';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  url = 'https://api.thecatapi.com/v1/breeds';

  let breeds;

  return fetch(url)
    .then(response => {
      // Response handling
      return response.json();
    })
    .catch(error => {
      // Error handling
      console.log(error);
    });
}

export function fetchCatByBreed(breedId) {
  url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url)
    .then(response => {
      // Response handling
      console.log('Ok');
      return response.json();
    })
    .catch(error => {
      // Error handling
      return error;
    });
}
