import TripTitle from "./components/header/trip-title.js";
import TripCost from "./components/header/trip-cost.js";
import Navigation from "./components/header/page-navigation.js";
import Filters from "./components/header/trip-filter.js";
import Sorting from "./components/trip-sort.js";
import DayItem from "./components/day-item.js";
import DaysContainer from "./components/days-container.js";
import TripEvent from "./components/trip-event.js";
import TripEdittor from "./components/trip-edittor.js";
import {generetedEvents} from "./mock/generated-events.js";
import {MAIN_FILTERS} from "./mock/main-filters.js";
import {SORT_FILTERS} from "./mock/sort-filters.js";
import {NAV_ITEMS} from "./mock/nav-items.js";
import {renderElement, RenderPosition} from "./utils";

const dates = [
  ...new Set(generetedEvents.map((item) => new Date(item.startDate).toDateString()))
];

const tripMain = document.querySelector(`.trip-main`);
renderElement(
  tripMain, 
  new TripTitle(generetedEvents).getElement(),
  RenderPosition.AFTERBEGIN);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
renderElement(
  tripInfoContainer, 
  new TripCost().getElement(),
  RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-controls`);
renderElement(
  tripControls, 
  new Navigation(NAV_ITEMS).getElement(), 
  RenderPosition.BEFOREEND);

renderElement(
  tripControls, 
  new Filters(MAIN_FILTERS).getElement(), 
  RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
renderElement(
  tripEvents, 
  new Sorting(SORT_FILTERS).getElement(),
  RenderPosition.BEFOREEND);

renderElement(
  tripEvents, 
  new DaysContainer().getElement(),
  RenderPosition.BEFOREEND);

const tripDays = tripEvents.querySelector(`.trip-days`);

dates.forEach((date, dateIndex) => {
  const day = new DayItem(
    new Date(date),
    dateIndex + 1
  ).getElement();

  generetedEvents
    .filter((_tripEvent) => new Date(_tripEvent.startDate).toDateString() === date)
    .forEach((_tripEvent, eventIndex) => {
      const eventsList = day.querySelector(`.trip-events__list`);
      const tripEventComponent = new TripEvent(_tripEvent).getElement();
      const tripEdittorComponent = new TripEdittor(_tripEvent).getElement();

      renderElement(
        eventsList,
        tripEventComponent,
        RenderPosition.BEFOREEND
      );

      tripEventComponent
        .querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, () => {
          eventsList.replaceChild(tripEdittorComponent, tripEventComponent)
        });

        tripEdittorComponent,addEventListener(`submit`, (evt) => {
          evt.preventDefault();
          eventsList.replaceChild(tripEventComponent, tripEdittorComponent)
        });
    });

  renderElement(tripDays, day, RenderPosition.BEFOREEND);
});

const getFullPrice = generetedEvents.reduce((acc, item) => acc + item.price, 0);

document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
