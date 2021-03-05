const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
const input = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function searchPlace(keyword, cities) {
  const regex = new RegExp(keyword, "gi");
  if (cities.length > 0) {
    return cities.filter(
      (place) => place.city.match(regex) || place.state.match(regex)
    );
  }
}

async function getPlaces() {
  await fetch(endpoint)
    .then((result) => result.json())
    .then((data) => cities.push(...data));
}

function loadResult(event) {
  const {
    currentTarget: { value },
  } = event;
  
  const matchArray = searchPlace(value, cities);
  suggestions.innerHTML = matchArray
    .map((place) => {
      const regex = new RegExp(value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    })
    .join("");
}

function init() {
  getPlaces();
  input.addEventListener("keyup", loadResult);
}

init();
