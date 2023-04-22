import refs from './refs';

function createMarkupCountryList(country) {
  const markup = country
    .map(
      ({ name, flags: { svg } }) =>
        `<li class='country-list-item'>
        <img src="${svg}" alt="${name}" width="20" height="auto">
        <p>${name.official}</p>
      </li>`
    )
    .join('');
  refs.list.innerHTML = markup;
}

function createMarkupCountryInfo(country) {
  const markup = country
    .map(({ name, capital, population, flags: { svg }, languages }) => {
      const languagesList = Object.values(languages);
      return ` <img src="${svg}" alt="${name}" width="320" height="auto">
        <div class='country-info-content'>
          <p> ${name.official}</p>
          <p>Capital: <span> ${capital}</span></p>
          <p>Population: <span> ${population}</span></p>
          <p>Languages: <span> ${languagesList}</span></p>
        </div>`;
    })
    .join('');
  refs.box.innerHTML = markup;
}

export { createMarkupCountryList, createMarkupCountryInfo };
