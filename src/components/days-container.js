import {createElement} from "../utils.js";

const daysContainer = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class DaysContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return daysContainer();
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