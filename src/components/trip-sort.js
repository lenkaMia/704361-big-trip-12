import AbstractComponent from "./abstract-component.js";

const createSortMark = (sorting) => {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sorting.name}">
      <input id="sort-event" 
        class="trip-sort__input  visually-hidden" 
        type="radio" name="trip-sort" 
        value="sort-${sorting.name}" 
        ${sorting.active && `checked`}>
        <label class="trip-sort__btn" for="sort-event">
        ${sorting.name.charAt(0).toUpperCase() + sorting.name.slice(1)}
      </label>
    </div>`
  );
};


const tripSort = (sortings) => {
  const sortingsMarks = sortings.map((sorting) => createSortMark(sorting)).join(`\n`);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <span class="trip-sort__item  trip-sort__item--day">Day</span>
            ${sortingsMarks}

            <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
          </form>`
  );
};

export default class Sorting extends AbstractComponent {
  constructor(sortings) {
    super();
    this._sortings = sortings;
  }

  getTemplate() {
    return tripSort(this._sortings);
  }
}
