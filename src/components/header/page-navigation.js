import {createElement} from "../../utils.js";

const pageNavigation = (navItems) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${navItems
      .map((item) =>
        `<a class="trip-tabs__btn ${item.active &&
        `trip-tabs__btn--active`}" href="#">${item.name}</a>`
      )
      .join(``)}
        </nav>`
  );
};

export default class Navigation {
  constructor(navItems) {
    this._navItems = navItems;
    this._element = null;
  }

  getTemplate() {
    return pageNavigation(this._navItems);
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
