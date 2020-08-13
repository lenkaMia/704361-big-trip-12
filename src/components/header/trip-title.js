import {getTripDuration} from "../../utils.js"

export const tripTitle = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">
          ${events[0].destination}
          ${events.length > 2 ? `&mdash; ... &mdash;` : `&mdash;`}
          ${events[events.length - 1].destination}
          </h1>
          <p class="trip-info__dates">
          ${getTripDuration(events[0].startDate, events[events.length - 1].endDate)}
          </p>
        </div>           
    </section>`
  );
};
