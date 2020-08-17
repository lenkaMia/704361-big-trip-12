import AbstractComponent from "../abstract-component.js";
import {getTripDuration} from "../../utils/utils.js"

const tripTitle = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">
          ${events.length ? events[0].destination : ''}
          ${events.length > 2 ? `&mdash; ... &mdash;` : events.length ? `&mdash;` : ''}
          ${events.length ? events[events.length - 1].destination : ''}
          </h1>
          <p class="trip-info__dates">
          ${events.length ? getTripDuration(events[0].startDate, events[events.length - 1].endDate) : ''}
          </p>
        </div>           
    </section>`
  );
};

export default class TripTitle extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return tripTitle(this._events);
  }
}
