import AbstractComponent from "../abstract-component.js";

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

export default class Navigation extends AbstractComponent {
  constructor(navItems) {
    super();
    this._navItems = navItems;
  }

  getTemplate() {
    return pageNavigation(this._navItems);
  }
}
