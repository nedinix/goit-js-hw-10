import refs from './refs';

function createMarkupList(country) {
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

function createMarkupInfo(country) {
  const markup = country
    .map(({ name, capital, population, flags: { svg }, languages }) => {
      const languagesList = Object.values(languages);
      return ` <img src="${svg}" alt="${name}" width="320" height="auto">
        <div class='country-info-content'>
          <p class='country-info-title'> ${name.official}</p>
          <p class='country-info-text'>Capital: <span> ${capital}</span></p>
          <p class='country-info-text'>Population: <span> ${population}</span></p>
          <p class='country-info-text'>Languages: <span> ${languagesList}</span></p>
        </div>`;
    })
    .join('');
  refs.box.innerHTML = markup;
}

export { createMarkupList, createMarkupInfo };
