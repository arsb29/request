/**
 * Задача повышенной сложности. На неё нет тестов, и ее выполнение
 * должно быть визуализировано.
 *
 * Напишите функцию makeRequests(urls, maxRequests), получающую
 * на вход массив ссылок urls и число maxRequests - максимальное
 * количество одновременных запросов. Условия:
 *
 * 1. Одновременно должно выполняться не более указанного
 *    числа запросов.
 * 2. Должен возвращаться promise, резолвящийся в массив результатов
 *    в той же последовательности, что и адреса запросов.
 * 3. Дублирующиеся урлы должны игнорироваться (при этом
 *    результат всё равно должен присутствовать в результате
 *    на нужной позиции).
 * 4. При падении любого из запросов вернувшийся промис
 *    должен реджектиться с той же ошибкой, что и оригинальный
 *    запрос.
 *
 * Требования к визуализации:
 *
 * 1. Должен быть создан index.html
 * 2. В интерфейсе должна быть возможность задать любое количество url.
 *    (Можно сделать это добавлением/удалением полей, перечислить через запятую в одном текстовом поле
 *    или любой другой вариант, на который хватит фантазии)
 * 3. В интерфейсе должна быть возможность задать число -- ограничение на количество запросов
 * 4. В интерфейсе должна быть кнопка, по нажатию на которую должно начинаться выполнение запросов
 * 5. После запуска должен отображаться список url
 * 6. У каждого url должен отображаться актуальный статус
 *    (wait, in progress, resolved, rejected), доп информация (duplicate) и результат. Хорошо,
 *    если статус будет отображаться цветом
 * 7. После выполнения всех запросов на страницу нужно вывести результат
 *
 * @param  {string[]} urls      массив с адресами
 * @param  {number} maxRequests максимальное количество одновременных запросов
 * @return {Promise}
 */
export const makeRequests = (urls, maxRequests) => {
  const newMaxRequests = maxRequests > urls.length ? urls.length : maxRequests;

  let completedPromises = 0;
  const cache = new Map();

  const answerPageRequests = document.querySelector('.answer-page__requests');

  answerPageRequests.innerHTML = '';
  urls.forEach(e => {
    answerPageRequests.innerHTML += `
<div class="answer-page__request">
<div class="answer-page__text">${e}</div>
<div class="answer-page__state"></div>
</div>`;
  });

  const requestsList = Array.from(document.querySelectorAll('.answer-page__request')).reverse();

  function getFullAnswers() {
    const finalPageAnswers = document.querySelector('.final-page__answers');

    finalPageAnswers.innerHTML = '';
    Array.from(document.querySelectorAll('.answer-page__request')).forEach(e => {
      const state = e.querySelector('.answer-page__state').classList;
      const url = e.querySelector('.answer-page__text').textContent;

      let answer = '';

      if (state.contains('resolved')) {
        const obj = cache.get(url);

        answer += ' { ';
        // eslint-disable-next-line guard-for-in
        for (const property in obj) {
          answer += `${property}: ${obj[property]}; `;
        }
        answer += ' }';
      } else if (state.contains('duplicate')) {
        answer = 'Дубликат';
      } else {
        answer = 'Ошибка';
      }
      finalPageAnswers.innerHTML += `<div div class="final-page__answer" >
<div class="final-page__secondTitle">Запрос</div>
<div class="final-page__text">${url}</div>
<div class="final-page__secondTitle">Результат</div>
<div class="final-page__text">${answer}</div>
</div>`;
    });
  }
  function request(element) {
    const url = element.querySelector('.answer-page__text').textContent;

    const state = element.querySelector('.answer-page__state');

    state.classList.add('inProgress');
    if (cache.has(url)) {
      state.classList.add('duplicate');
      request(requestsList.pop());
    } else {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          state.classList.add('rejected');
          throw new Error('Something went wrong');
        })
        .then(text => {
          cache.set(url, text);
          state.classList.add('resolved');
          return text;
        })
        .finally(() => {
          completedPromises += 1;
          if (completedPromises === urls.length) {
            getFullAnswers();
          } else {
            request(requestsList.pop());
          }
        });
    }
  }

  for (let index = 0; index < newMaxRequests; index++) {
    request(requestsList.pop());
  }
};
