import Sorting from "../components/trip-sort.js";
import DaysContainer from "../components/days-container.js";
import DayItem from "../components/day-item.js";
import TripEvent from "../components/trip-event.js";
import TripEdittor from "../components/trip-edittor.js";
import {renderElement, RenderPosition, replace} from "../utils/render.js";
import {SORT_FILTERS} from "../mock/sort-filters.js";

const tripEvents = document.querySelector(`.trip-events`);

export default class Trip {
  constructor(container) {
    this._container = container;
    this._daysContainer = new DaysContainer();
  }

  renderTrip(generetedEvents) {
    const dates = [
      ...new Set(generetedEvents.map((item) => new Date(item.startDate).toDateString()))
    ];

    renderElement(
        tripEvents,
        new Sorting(SORT_FILTERS),
        RenderPosition.BEFOREEND);

    renderElement(
        tripEvents,
        this._daysContainer,
        RenderPosition.BEFOREEND);

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

    const getFullPrice = generetedEvents.reduce((acc, item) => acc + item.price, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
  }
}
