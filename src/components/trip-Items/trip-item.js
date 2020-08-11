import {createItemOffer} from './create-item-offer.js';

// const createDayItemsList = (items) => {
//     console.log(items)
//     const itemsList = items.map((it) => tripItem(it));
//     return (
//         `<ul class="trip-events__list">
//         ${itemsList}
//         </ul>`
//     );
// };

// const createTripDay = (tripDate, dayItems, dayIndex) => {
//     const dayItemsMarkup = createDayItemsList(dayItems);
//     const shortDate = tripDate
//         .split(`-`)
//         .slice(1)
//         .map((element, i) => {
//             element = i === 0 ? MONTH_NAMES[Number(element - 1)] : element;
//             return element;
//         })
//         .join(` `);

//     return (
//         `<li class="trip-days__item  day">
//               <div class="day__info">
//                 <span class="day__counter">${dayIndex}</span>
//                 <time class="day__date" datetime="${tripDate}">${shortDate}</time>
//               </div>
//               ${dayItemsMarkup}
//             </li>`
//     );
// };

export const tripItem = (item) => {
    const {type, destination, price, offers, action} = item;
    const eventOffers = createItemOffer(offers);
    console.log(type);
    return (
    `<li class="trip-events__item">
            <div class="event">
                <div class="event__type">
                    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
                </div>
                <h3 class="event__title">${type} ${action} ${destination}</h3>

                <div class="event__schedule">
                    <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
                        —
                        <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
                    </p>
                    <p class="event__duration">30M</p>
                </div>

                <p class="event__price">
                    €&nbsp;<span class="event__price-value">${price}</span>
                </p>

                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${eventOffers}
                </ul>

                <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                </button>
            </div>
        </li>`
  );
};

/**
 * @param {Object} trip  - объект с группированными по датам точкам путешествия, каждая уникальная дата = свойство
 * @return {string} - возвращает разметку списка всех дней со всеми путещшествиями
 */

// export const createTripDaysTemplate = (trip) => {
//     // console.log(trip)
//     // const days = Object.keys(trip).sort();
//     // const daysMarkup = days.map((day, i) => createTripDay(day, trip[day], (i + 1)));
//     return (
//         `<ul class="trip-days"> 
//         ${daysMarkup}
//         </ul>`
//     ); // каждая лишка в таблице  - это 1 день (одна дата), Trip = массив всех точек, не отсортированный и не сгруппированный. Задача номер 1 для этой функции - надо понять сколько уникальных дат в нашем массииве и какие они, для того чтобы понимать сколько строк рисовать в таблице и какую дату писать с левой стороны. Это можно сделать несколькими путями - например вытащить из каждой точки дату начала путешествия, сложить все в один массив и потом оставить только уникальные. Я работала с объектом, у меня после функции, которая в ватс ап был вот такой объект {2020-06-16: Array(2), 2020-06-17: Array(1), 2020-06-18: Array(1), 2020-06-19: Array(1), 2020-06-20: Array(3), …}. Каждый ключ (дата) использовался потом для отрисовки одной строки таблицы, массив точек к этой дате я передавала потом дальше
    
// };
