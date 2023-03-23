
'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function renderCountry(data, className='') {
  let currency = Object.values(data.currencies);
  let lang = Object.values(data.languages);

  console.log("languages: ", data.languages);
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name?.common}</h3>
        <h4 class="country__region">${data.region} </h4>
        <p class="country__row"><span>👫</span>${(Number(data.population) / 1000000).toFixed(1)} million</p>
        <p class="country__row"><span>💰</span>${currency[0].name}</p>
        <p class="country__row"><span>🗣️</span>${lang ? lang[0] : ''}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    // json() method also returns a promise which is why we need a new "then" or make this an async function)
    // json() converts the data in body to a json format data we can work with
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
    })
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0], 'neighbour');
    });
};

getCountryData('spain')
