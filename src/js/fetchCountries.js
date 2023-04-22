const BASE_URL = 'https://restcountries.com/v3.1/name';
const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?${searchParams}`).then(r => {
    if (r.status === 404) {
      throw new Error(r.status);
    }
    return r.json();
  });
}

export { fetchCountries };
