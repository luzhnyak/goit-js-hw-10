import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');
const selectEl = document.querySelector('.breed-select');

selectEl.addEventListener('change', onBreedSelect);

let breedsInfo;

function onBreedSelect(event) {
  Notiflix.Loading.standard('Loading data, please wait...');

  const breadId = event.target.value;
  const breedPr = fetchCatByBreed(breadId);

  breedPr
    .then(breedImg => {
      Notiflix.Loading.remove();
      if (breedImg === 'error') {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        return;
      }

      createMarkupBreed(breadId, breedImg);
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function createMarkupSelect(breeds) {
  const markupSelect = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join();

  selectEl.innerHTML = markupSelect;

  selectEl.style.visibility = 'inherit';
  new SlimSelect({
    select: '.breed-select',
  });
}

function createMarkupBreed(breadId, breedImg) {
  const { url } = breedImg[0];
  const { name, description, temperament } = breedsInfo.find(
    bread => bread.id === breadId
  );

  const markupSelect = `
  <h1>${name}</h1>
  <p>${description}</p>
  <p><strong>Temperament: </strong>${temperament}</p>
  <img src=${url}>`;

  catInfoEl.innerHTML = markupSelect;
}

Notiflix.Loading.standard('Loading data, please wait...');

const breedsPr = fetchBreeds();
breedsPr
  .then(breeds => {
    if (breeds === 'error') {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );

      return;
    }

    createMarkupSelect(breeds);
    Notiflix.Loading.remove();

    breedsInfo = breeds;
  })
  .catch(error => {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });
