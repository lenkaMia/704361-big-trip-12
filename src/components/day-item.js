import {createElement} from "../utils.js";

const getDayItem = (date, day) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="${date}">
        ${new Date(date).toLocaleString(`en-US`, {
      month: `short`
    })}
        ${new Date(date).getDate()}
        </time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class DayItem {
  constructor(date, day) {
    this._date = date;
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return getDayItem(this._date, this._day);
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
