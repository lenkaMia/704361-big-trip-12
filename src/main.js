import {tripTitle} from "./view/trip-title.js";
import {tripCost} from "./view/trip-cost.js";
import {tripControl} from "./view/trip-control.js";
import {tripFilter} from "./view/trip-filter.js";
import {tripSort} from "./view/trip-sort.js";
import {tripDay} from "./view/trip-day.js";
import {tripItem} from "./view/trip-item.js";
import {tripEdittor} from "./view/trip-edittor.js"

const TASK_COUNT = 3;

const siteHeaderTripElement = document.querySelector(`.trip-main`);
const siteHeaderMenuElement = siteHeaderTripElement.querySelector(`.trip-controls_menu`);
const siteHeaderFiltersElement = siteHeaderTripElement.querySelector(`.trip-controls_filters`);
const siteMainEventElement = document.querySelector(`.trip-events`);

const render = (place, temlate, position) => {
  place.insertAdjacentHTML(position, temlate);
};

render(siteHeaderTripElement, tripTitle(), `afterbegin`);

const siteHeaderCostElement = siteHeaderTripElement.querySelector(`.trip-info`);

render(siteHeaderCostElement, tripCost(), `beforeend`);
render(siteHeaderMenuElement, tripControl(), `afterend`);
render(siteHeaderFiltersElement, tripFilter(), `afterend`);
render(siteMainEventElement, tripSort(), `beforeend`);
render(siteMainEventElement, tripDay(), `beforeend`);

const siteTripItemElement = siteMainEventElement.querySelector(`.trip-events__list`);

render(siteTripItemElement, tripEdittor(), `afterbegin`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteTripItemElement, tripItem(), `beforeend`);
}
