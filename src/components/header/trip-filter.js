import {createElement} from "../utils.js";

const tripFilter = (filters) => {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${filters
      .map((filter) => {
        return `
          <div class="trip-filters__filter">
            <input
              id="filter-${filter.name}"
              class="trip-filters__filter-input  visually-hidden"
              type="radio"
              name="trip-filter"
              value="${filter.name}"
              ${filter.active && `checked`}
            />
            <label class="trip-filters__filter-label" for="filter-
            ${filter.name}">
            ${filter.name}
            </label>
          </div>
      `;
      })
      .join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return tripFilter(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
