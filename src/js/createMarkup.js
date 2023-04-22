import refs from './refs';

function createMarkupCountryList(country) {
  const markup = country
    .map(
      ({ name, flags: { svg } }) =>
        `<li>
        <img src="${svg}" alt="${name}" width="20" height="auto">
        <p>${name.official}</p>
      </li>`
    )
    .join('');
  refs.list.insertAdjacentHTML('beforeend', markup);
}

function createMarkupCountryDescription(country) {
  const markup = country
    .map(({ name, capital, population, flags: { svg }, languages }) => {
      const languagesList = Object.values(languages);
      return ` <img src="${svg}" alt="${name}" width="320" height="auto">
        <p> ${name.official}</p>
        <p>Capital: <span> ${capital}</span></p>
        <p>Population: <span> ${population}</span></p>
        <p>Languages: <span> ${languagesList}</span></p>`;
    })
    .join('');
  refs.box.innerHTML = markup;
}

export { createMarkupCountryList, createMarkupCountryDescription };
