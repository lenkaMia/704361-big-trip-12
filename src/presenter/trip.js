import Sorting from "../components/trip-sort.js";
import DayItem from "../components/day-item.js";
import TripEvent from "../components/trip-event.js";
import TripEdittor from "../components/trip-edittor.js";
import {renderElement, RenderPosition, replace} from "../utils/render.js";
import {SortType} from "../mock/sort-type.js";

const tripEvents = document.querySelector(`.trip-events`);

const renderEventCards = (generetedEvents, container, isDefaultSorting = true) => {
  const dates = isDefaultSorting ? 
  [...new Set(generetedEvents.map((item) => new Date(item.startDate).toDateString()))] : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting ? 
    new DayItem(new Date(date), dateIndex + 1) : new DayItem();
    const dayElement = day.getElement();

    generetedEvents
      .filter((_tripEvent) => { 
        return isDefaultSorting ?
         new Date(_tripEvent.startDate).toDateString() === date : _tripEvent;})
      .forEach((_tripEvent) => {
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

        tripEventComponent.setClickHandler(() => {
          replace(tripEdittorComponent, tripEventComponent);
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        tripEdittorComponent.setSubmitHandler((evt) => {
          evt.preventDefault();
          replace(tripEventComponent, tripEdittorComponent);
        });
      });

    renderElement(container, day, RenderPosition.BEFOREEND);
  });
}

export default class Trip {
  constructor(container) {
    this._container = container;
    this._sorting = new Sorting();
  }

  renderTrip(generetedEvents) {
    renderEventCards (generetedEvents, this._container);

    renderElement(
        tripEvents,
        this._sorting,
        RenderPosition.AFTERBEGIN);

    this._sorting.setSortChangeHandler((sortType) => {
      let sortedEvents = [];
      let isDefaultSorting = false;

      switch (sortType) {
        case SortType.DATE_DOWN:
          sortedEvents = generetedEvents.slice();
          isDefaultSorting = true;
          break;
        case SortType.TIME_DOWN:
          sortedEvents = generetedEvents.slice().sort((a, b) => b.startDate - a.startDate);
          break;
        case SortType.PRICE_DOWN:
          sortedEvents = generetedEvents.slice().sort((a, b) => b.price - a.price);
          break;
      }

      this._container.innerHTML = ``;
      renderEventCards(sortedEvents, this._container, isDefaultSorting);
    })

    const getFullPrice = generetedEvents.reduce((acc, item) => acc + item.price, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
  }
}
