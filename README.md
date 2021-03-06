# request
[Ссылка на проект](https://arsb29.github.io/request/)

Задача повышенной сложности. На неё нет тестов, и ее выполнение должно быть визуализировано.

Напишите функцию `makeRequests(urls, maxRequests)`, получающую на вход массив ссылок `urls` и число `maxRequests` - максимальное количество одновременных запросов. Условия:
<ol>
  <li>Одновременно должно выполняться не более указанного числа запросов.</li>
  <li>Должен возвращаться <code>promise</code>, резолвящийся в массив результатов в той же последовательности, что и адреса запросов.</li>
  <li>Дублирующиеся урлы должны игнорироваться (при этом результат всё равно должен присутствовать в результате на нужной позиции).</li>
  <li>При падении любого из запросов вернувшийся промис должен реджектиться с той же ошибкой, что и оригинальный запрос.</li>
</ol>

Требования к визуализации:
<ol>
  <li>Должен быть создан <code>index.html</code></li>
  <li>В интерфейсе должна быть возможность задать любое количество <code>url</code>. (Можно сделать это добавлением/удалением полей, перечислить через запятую в одном текстовом поле или любой другой вариант, на который хватит фантазии)</li>
  <li>В интерфейсе должна быть возможность задать число -- ограничение на количество запросов</li>
  <li>В интерфейсе должна быть кнопка, по нажатию на которую должно начинаться выполнение запросов</li>
  <li>После запуска должен отображаться список <code>url</code></li>
  <li>У каждого <code>url</code> должен отображаться актуальный статус (<code>wait</code>, <code>in progress</code>, <code>resolved</code>, <code>rejected</code>), доп информация (<code>duplicate</code>) и результат. Хорошо, если статус будет отображаться цветом</li>
  <li>После выполнения всех запросов на страницу нужно вывести результат</li>
</ol>

```javascript
@param  {string[]} urls // массив с адресами

@param  {number} maxRequests // максимальное количество одновременных запросов

@return {Promise}
```
