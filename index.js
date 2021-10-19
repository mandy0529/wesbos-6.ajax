const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const getData = async () => {
  const data = await (await fetch(endpoint)).json();
  const eachData = cities.push(...data);
  return eachData;
};

const fetchData = (query) => {
  const citiesData = cities.filter((word) => {
    const regex = new RegExp(query, 'gi');
    return word.city.match(regex) || word.state.match(regex);
  });
  return citiesData;
};

const handleChange = (e) => {
  const value = e.target.value;
  const getCity = fetchData(value);
  const items = getCity
    .map((data) => {
      const regex = new RegExp(e.target.value, 'gi');
      const cityName = data.city.replace(
        regex,
        `<span class="hl">${e.target.value}</span>`
      );
      const stateName = data.state.replace(
        regex,
        `<span class="hl">${e.target.value}</span>`
      );
      return `<li>
    <span class="name">${cityName},${stateName}</span>
    <span class="population">${numberWithCommas(data.population)}</span>
    </li>`;
    })
    .join('');

  suggestions.innerHTML = items;
};

const init = () => {
  getData();
};

init();

searchInput.addEventListener('input', handleChange);
