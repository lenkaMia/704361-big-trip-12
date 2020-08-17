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
import {renderElement, RenderPosition, replace} from "./utils/render.js";
import NoEventText from "./components/no-event-text.js";

const tripMain = document.querySelector(`.trip-main`);
renderElement(
  tripMain, 
  new TripTitle(generetedEvents),
  RenderPosition.AFTERBEGIN);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
renderElement(
  tripInfoContainer, 
  new TripCost(),
  RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-controls`);
renderElement(
  tripControls, 
  new Navigation(NAV_ITEMS), 
  RenderPosition.BEFOREEND);

renderElement(
  tripControls, 
  new Filters(MAIN_FILTERS), 
  RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);

if (generetedEvents.length === 0) {
  renderElement(
    tripEvents,
    new NoEventText(),
    RenderPosition.BEFOREEND
  );
} else {
  renderElement(
    tripEvents,
    new Sorting(SORT_FILTERS),
    RenderPosition.BEFOREEND);

  renderElement(
    tripEvents,
    new DaysContainer(),
    RenderPosition.BEFOREEND);

  const tripDays = tripEvents.querySelector(`.trip-days`);

  const dates = [
    ...new Set(generetedEvents.map((item) => new Date(item.startDate).toDateString()))
  ];

  dates.forEach((date, dateIndex) => {
    const day = new DayItem(new Date(date), dateIndex + 1);
    const dayElement = day.getElement();

    generetedEvents
      .filter((_tripEvent) => new Date(_tripEvent.startDate).toDateString() === date)
      .forEach((_tripEvent, eventIndex) => {
        const eventsList = dayElement.querySelector(`.trip-events__list`);
        const tripEventComponent = new TripEvent(_tripEvent);
        const tripEdittorComponent = new TripEdittor(_tripEvent);

        const onEscKeyDown = (evt) => {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

          if (isEscKey) {
            replace(tripEventComponent, tripEdittorComponent);
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        renderElement(
          eventsList,
          tripEventComponent,
          RenderPosition.BEFOREEND
        );

        tripEventComponent
          .getElement()
          .querySelector(`.event__rollup-btn`)
          .addEventListener(`click`, () => {
            replace(tripEdittorComponent, tripEventComponent);
            document.addEventListener(`keydown`, onEscKeyDown);
          });

        tripEdittorComponent.getElement().addEventListener(`submit`, (evt) => {
          evt.preventDefault();
          replace(tripEventComponent, tripEdittorComponent);
        });
      });

    renderElement(tripDays, day, RenderPosition.BEFOREEND);
  });

  const getFullPrice = generetedEvents.reduce((acc, item) => acc + item.price, 0);

  document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
}
