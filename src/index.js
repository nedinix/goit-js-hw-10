import './css/styles.css';
import refs from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import {
  createMarkupCountryList,
  createMarkupCountryInfo,
} from './js/createMarkup';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

clearInterface();
refs.box.style.visibility = 'hidden';
refs.list.style.visibility = 'hidden';

function onInput(e) {
  const searchValue = e.target.value.trim();

  if (!searchValue) {
    clearInterface();
    return;
  }
  fetchCountries(searchValue)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      return renderResponse(data);
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderResponse(value) {
  if (value.length === 1) {
    addHidden(refs.list);
    createMarkupCountryInfo(value);
    refs.box.style.visibility = 'visible';
  }
  if (value.length >= 2 && value.length <= 10) {
    createMarkupCountryList(value);
    addHidden(refs.box);
    refs.list.style.visibility = 'visible';
  }
}

function clearInterface() {
  refs.box.innerHTML = '';

  refs.list.innerHTML = '';
}

function addHidden(elem) {
  elem.innerHTML = '';
  elem.style.visibility = 'hidden';
}
