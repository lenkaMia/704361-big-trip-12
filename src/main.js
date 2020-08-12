import {tripTitle} from "./components/header/trip-title.js";
import {tripCost} from "./components/header/trip-cost.js";
import {pageNavigation} from "./components/header/page-navigation.js";
import {tripFilter} from "./components/header/trip-filter.js";
import {tripSort} from "./components/trip-sort.js";
import {getDayItem} from "./components/trip-events/get-day-item.js";
import {daysContainer} from "./components/trip-events/days-container.js";
import {getTripEvent} from "./components/trip-events/get-trip-event.js";
import {tripEdittor} from "./components/trip-edittor.js";
import {generetedEvents} from "./components/trip-events/generate-trip-events.js";
import {SORT_FILTERS, MAIN_FILTERS} from "./components/trip-events/trip-event-data.js";
import {renderElement, createElement} from "./utils";

const dates = [
  ...new Set(generetedEvents.map((item) => new Date(item.startDate).toDateString()))
];

const tripMain = document.querySelector(`.trip-main`);
renderElement(tripMain, tripTitle(generetedEvents), `afterbegin`);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
renderElement(tripInfoContainer, tripCost());

const tripControlsNav = tripMain.querySelector(`.trip-controls_menu`);
renderElement(tripControlsNav, pageNavigation(), `afterend`);

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
        eventIndex === 0 && dateIndex === 0 ? tripEdittor(_tripEvent) : getTripEvent(_tripEvent)
      );
    });

  renderElement(tripDays, day.parentElement.innerHTML);
});

const getFullPrice = generetedEvents.reduce((acc, item) => acc + item.price, 0);

document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
