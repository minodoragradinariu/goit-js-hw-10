import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const catImg = document.querySelector('.cat-img');
const catBreed = document.querySelector('.cat-breed');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');

function toggleLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function toggleError(show) {
  error.classList.toggle('hidden', !show);
}

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function displayCatInfo(cat) {
  catImg.src = cat.url || 'assets/placeholder.png'; // Imagine default dacă lipsește
  catBreed.textContent = cat.breeds[0]?.name || 'Unknown breed';
  catDescription.textContent = cat.breeds[0]?.description || 'No description available.';
  catTemperament.textContent = cat.breeds[0]?.temperament || 'Unknown temperament';
  catInfo.classList.remove('hidden');
}

breedSelect.addEventListener('change', async event => {
  const breedId = event.target.value;
  if (breedId) {
    toggleLoader(true);
    toggleError(false);
    catInfo.classList.add('hidden');
    try {
      const catData = await fetchCatByBreed(breedId);
      if (catData.length === 0) throw new Error('No cat found for this breed');
      displayCatInfo(catData[0]);
    } catch (err) {
      console.error(err);
      toggleError(true);
    } finally {
      toggleLoader(false);
    }
  } else {
    catInfo.classList.add('hidden');
  }
});

async function init() {
  toggleLoader(true);
  toggleError(false);
  try {
    const breeds = await fetchBreeds();
    populateBreedSelect(breeds);
  } catch (err) {
    console.error(err);
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}

init();
