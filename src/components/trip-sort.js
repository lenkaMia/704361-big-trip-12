import AbstractComponent from "./abstract-component.js";
import {SortType} from "../mock/sort-type.js";

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._sortings = SortType;
  }

  getTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      <div class="trip-sort__item  trip-sort__item--event">
        <input
          id="sort-event"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-event"
          checked
          data-sort-type="${SortType.DATE_DOWN}"
        />
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>
      <div class="trip-sort__item  trip-sort__item--time">
        <input
          id="sort-time"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-time"
          data-sort-type="${SortType.TIME_DOWN}"
        />
        <label class="trip-sort__btn" for="sort-time">
          Time
          <svg
            class="trip-sort__direction-icon"
            width="8"
            height="10"
            viewBox="0 0 8 10"
          >
            <path
              d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"
            />
          </svg>
        </label>
      </div>
      <div class="trip-sort__item  trip-sort__item--price">
        <input
          id="sort-price"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-price"
          data-sort-type="${SortType.PRICE_DOWN}"
        />
        <label class="trip-sort__btn" for="sort-price">
          Price
          <svg
            class="trip-sort__direction-icon"
            width="8"
            height="10"
            viewBox="0 0 8 10"
          >
            <path
              d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"
            />
          </svg>
        </label>
      </div>
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`;
  }

  setSortChangeHandler(cb) {
    this.getElement().addEventListener(`click`, (evt) =>{
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._sortings === sortType) {
        return;
      }

      this._sortings = sortType;

      cb(this._sortings);
    });
  }
}
