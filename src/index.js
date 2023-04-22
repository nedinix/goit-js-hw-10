import './css/styles.css';
import refs from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import {
  createMarkupCountryList,
  createMarkupCountryDescription,
} from './js/createMarkup';

import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchValue = e.target.value.trim();

  if (searchValue) {
    fetchCountries(searchValue)
      .then(data => {
        console.log('data', data);
        console.log('data.lenght', data.length);
        return renderResponse(data);
      })
      .catch(err => console.log(err));
  } else {
    clearInterface();
  }
}

function renderResponse(value) {
  if (value.length === 1) {
    refs.list.innerHTML = '';
    createMarkupCountryDescription(value);
  }
  if (value.length > 2 && value.length <= 10) {
    refs.box.innerHTML = '';
    createMarkupCountryList(value);
  } else {
    refs.list.innerHTML = '';
  }
}

function clearInterface() {
  refs.box.innerHTML = '';
  refs.list.innerHTML = '';
}
