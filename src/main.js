import {tripTitle} from "./components/header/trip-title.js";
import {tripCost} from "./components/header/trip-cost.js";
import {pageNavigation} from "./components/header/page-navigation.js";
import {tripFilter} from "./components/header/trip-filter.js";
import {tripSort} from "./components/trip-sort.js";
import {day} from "./components/trip-events/day.js";
import {daysContainer} from "./components/trip-events/days-container.js";
import {tripEvent} from "./components/trip-events/trip-event.js";
import {tripEventsContainer} from "./components/trip-events/trip-events-container.js";
import {tripEdittor} from "./components/trip-edit-form/trip-edittor.js";
import {getTripEvent, generateTripItems} from "./components/trip-events/trip.js";
import {SORT_FILTERS, MAIN_FILTERS} from "./components/trip-events/trip-event-data.js";

const TASK_COUNT = 4;

const tripMain = document.querySelector(`.trip-main`);
const tripControlsNav = tripMain.querySelector(`.trip-controls_menu`);
const tripControlsFilter = tripMain.querySelector(`.trip-controls_filters`);
const tripEvents = document.querySelector(`.trip-events`);

const render = (place, temlate, position) => {
  place.insertAdjacentHTML(position, temlate);
};

render(tripMain, tripTitle(), `afterbegin`);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);

render(tripInfoContainer, tripCost(), `beforeend`);
render(tripControlsNav, pageNavigation(), `afterend`);
render(tripControlsFilter, tripFilter(MAIN_FILTERS), `afterend`);
render(tripEvents, tripSort(SORT_FILTERS), `beforeend`);
render(tripEvents, tripEdittor(getTripEvent()), `afterbegin`);

// Дни

render(tripEvents, daysContainer(), `beforeend`);

const tripDays = tripEvents.querySelector(`.trip-days`);

render(tripDays, day(), `beforeend`);

const days = document.querySelector(`.day`);

// События

render(days, tripEventsContainer(), `beforeend`);

const eventsContainer = tripEvents.querySelector(`.trip-events__list`);
const tripItems = generateTripItems(TASK_COUNT);

for (let i = 0; i < TASK_COUNT; i++) {
  console.log(tripItems)
  render(eventsContainer, tripEvent(tripItems[i]), `beforeend`);
;
}
