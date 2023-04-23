import './css/styles.css';
import refs from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import { createMarkupList, createMarkupInfo } from './js/createMarkup';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

clearInterface();

function onInput(e) {
  const searchValue = e.target.value.trim();

  if (!searchValue) {
    clearInterface();
    return;
  }
  fetchCountries(searchValue)
    .then(data => {
      if (data.length > 10) {
        clearInterface();
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      return renderResponse(data);
    })
    .catch(err => {
      clearInterface();
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderResponse(value) {
  if (value.length === 1) {
    toogleHiddenEl(refs.list, refs.box);
    createMarkupInfo(value);
  }
  if (value.length >= 2 && value.length <= 10) {
    toogleHiddenEl(refs.box, refs.list);
    createMarkupList(value);
  }
}

function clearInterface() {
  refs.box.innerHTML = '';
  refs.list.innerHTML = '';
  refs.box.style.visibility = 'hidden';
  refs.list.style.visibility = 'hidden';
}

function toogleHiddenEl(hiddenEl, visibleEl) {
  hiddenEl.innerHTML = '';
  hiddenEl.style.visibility = 'hidden';
  visibleEl.style.visibility = 'visible';
}
