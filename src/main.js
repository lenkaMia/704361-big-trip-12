import {tripTitle} from "./components/header/trip-title.js";
import {tripCost} from "./components/header/trip-cost.js";
import {pageNavigation} from "./components/header/page-navigation.js";
import {tripFilter} from "./components/header/trip-filter.js";
import {tripSort} from "./components/trip-sort.js";
import {getDayItem} from "./components/day-item.js";
import {daysContainer} from "./components/days-container.js";
import {getTripEvent} from "./components/trip-event.js";
import tripEdittorComponent from "./components/trip-edittor.js";
import {generetedEvents} from "./mock/generated-events.js";
import {MAIN_FILTERS} from "./mock/main-filters.js";
import {SORT_FILTERS} from "./mock/sort-filters.js";
import {NAV_ITEMS} from "./mock/nav-items.js";
import {renderElement, createElement} from "./utils";

const dates = [
  ...new Set(generetedEvents.map((item) => new Date(item.startDate).toDateString()))
];

const tripMain = document.querySelector(`.trip-main`);
renderElement(tripMain, tripTitle(generetedEvents), `afterbegin`);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
renderElement(tripInfoContainer, tripCost());

const tripControlsNav = tripMain.querySelector(`.trip-controls_menu`);
renderElement(tripControlsNav, pageNavigation(NAV_ITEMS), `afterend`);

const tripControlsFilter = tripMain.querySelector(`.trip-controls_filters`);
renderElement(tripControlsFilter, tripFilter(MAIN_FILTERS), `afterend`);

const tripEvents = document.querySelector(`.trip-events`);
renderElement(tripEvents, tripSort(SORT_FILTERS));

renderElement(tripEvents, daysContainer());

const tripDays = tripEvents.querySelector(`.trip-days`);

dates.forEach((date, dateIndex) => {
  const day = createElement(getDayItem(new Date(date), dateIndex + 1));

  generetedEvents
    .filter((_tripEvent) => new Date(_tripEvent.startDate).toDateString() === date)
    .forEach((_tripEvent, eventIndex) => {
      renderElement(
        day.querySelector(`.trip-events__list`),
        eventIndex === 0 && dateIndex === 0 ? new tripEdittorComponent(_tripEvent).getElement() : getTripEvent(_tripEvent)
      );
    });

  renderElement(tripDays, day.parentElement.innerHTML);
});

const getFullPrice = generetedEvents.reduce((acc, item) => acc + item.price, 0);

document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
