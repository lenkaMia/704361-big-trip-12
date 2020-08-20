import Sorting from "../components/trip-sort.js";
import DayItem from "../components/day-item.js";
import TripEvent from "../components/trip-event.js";
import TripEdittor from "../components/trip-edittor.js";
import {renderElement, RenderPosition, replace} from "../utils/render.js";
import {SortType} from "../mock/sort-type.js";

const tripEvents = document.querySelector(`.trip-events`);

export default class Trip {
  constructor(container) {
    this._container = container;
    this._sorting = new Sorting();
  }

  renderTrip(generetedEvents) {
    const dates = [
      ...new Set(generetedEvents.map((item) => new Date(item.startDate).toDateString()))
    ];

    renderElement(
        tripEvents,
        this._sorting,
        RenderPosition.AFTERBEGIN);

    dates.forEach((date, dateIndex) => {
      const day = new DayItem(new Date(date), dateIndex + 1);
      const dayElement = day.getElement();

      generetedEvents
        .filter((_tripEvent) => new Date(_tripEvent.startDate).toDateString() === date)
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

      renderElement(this._container, day, RenderPosition.BEFOREEND);
    });

    this._sorting.setSortChangeHandler((sortType) => {
      let sortedEvents = [];

      switch (sortType) {
        case SortType.DATE_DOWN:
          sortedEvents = events.slice();
          break;
        case SortType.TIME_DOWN:
          sortedEvents = events.slice().sort((a, b) => b.startDate - a.startDate);
          break;
        case SortType.PRICE_DOWN:
          sortedEvents = events.slice().sort((a, b) => a.price - b.price);
          break;
      }

      this._container.getElement().innerHTML = ``;
    })

    const getFullPrice = generetedEvents.reduce((acc, item) => acc + item.price, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
  }
}
