import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
const LOCALSTORAGE_KEY = `feedback-form-state`;

const onFormInput = e => {
  const { name, value } = e.target;
  let savedMsg = load(LOCALSTORAGE_KEY);
  savedMsg = savedMsg ? savedMsg : {};
  savedMsg[name] = value;
  save(LOCALSTORAGE_KEY, savedMsg);
};

const onTextareaPopulation = () => {
  const savedMsg = load(LOCALSTORAGE_KEY);
  if (!savedMsg) {
    return;
  }
  Object.entries(savedMsg).forEach(([name, value]) => {
    refs.form.elements[name].value = value;
  });
};

const onFormSubmit = e => {
  e.preventDefault();
  e.target.reset();
  remove(LOCALSTORAGE_KEY);
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

onTextareaPopulation();
