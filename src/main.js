import {tripTitle} from "./components/header/trip-title.js";
import {tripCost} from "./components/header/trip-cost.js";
import {pageNavigation} from "./components/header/page-navigation.js";
import {tripFilter} from "./components/header/trip-filter.js";
import {tripSort} from "./components/trip-sort.js";
import { tripDay } from "./components/trip-day.js";
import {tripItem} from "./components/trip-items/trip-item.js";
import {tripEdittor} from "./components/trip-edittor.js";
import {getTripItems} from "./mock/trip.js";
import {SORT_FILTERS, MAIN_FILTERS} from "./const.js";

const TASK_COUNT = 4;
const tripItems = getTripItems(TASK_COUNT);

const siteHeaderTripElement = document.querySelector(`.trip-main`);
const siteHeaderMenuElement = siteHeaderTripElement.querySelector(`.trip-controls_menu`);
const siteHeaderFiltersElement = siteHeaderTripElement.querySelector(`.trip-controls_filters`);
const siteTripEventsElement = document.querySelector(`.trip-events`);

const render = (place, temlate, position) => {
  place.insertAdjacentHTML(position, temlate);
};

render(siteHeaderTripElement, tripTitle(), `afterbegin`);

const siteHeaderCostElement = siteHeaderTripElement.querySelector(`.trip-info`);

render(siteHeaderCostElement, tripCost(), `beforeend`);
render(siteHeaderMenuElement, pageNavigation(), `afterend`);
render(siteHeaderFiltersElement, tripFilter(MAIN_FILTERS), `afterend`);
render(siteTripEventsElement, tripSort(SORT_FILTERS), `beforeend`);
render(siteTripEventsElement, tripDay(), `beforeend`);

const siteTripItemElement = siteTripEventsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < TASK_COUNT; i++) {
  console.log(tripItems)
  render(siteTripItemElement, tripItem(tripItems[i]), `beforeend`);
;
}

render(siteHeaderMenuElement, tripEdittor(), `afterbegin`);
