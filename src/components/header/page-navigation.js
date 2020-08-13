export const pageNavigation = (navItems) => {
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
