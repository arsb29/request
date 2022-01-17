// eslint-disable-next-line import/extensions
import { makeRequests } from './makeRequests.js';

// eslint-disable-next-line consistent-return
window.makeRequests = () => {
  const textArea = document.querySelector('.input-page__input').value;

  if (textArea !== '') {
    const urls = textArea.split('\n').map(x => x.trim());
    const limit = parseInt(document.querySelector('.input-page__limit').textContent, 10);

    document.querySelector('.answer-page').style.display = 'block';
    document.querySelector('.final-page').style.display = 'block';

    return makeRequests(urls, limit);
  }
};

// window.makeRequests()

window.addValue = () => {
  const limit = document.querySelector('.input-page__limit');

  limit.innerHTML = parseInt(limit.textContent, 10) + 1;
};

window.removeValue = () => {
  const limit = document.querySelector('.input-page__limit');

  if (parseInt(limit.textContent, 10) > 1) {
    limit.innerHTML = parseInt(limit.textContent, 10) - 1;
  }
};
