import {parseTime} from "../utils/utils.js";
import AbstractComponent from "./abstract-component.js";

const createEventOffer = (offers) => {
  return offers.map((offer) => {
    const {title, price} = offer;

    return (
      `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </li>`
    );
  })
        .join(`\n`);
};

const getTripEvent = (tripEvent) => {
  const {type, destination, price, offers, action, startDate, endDate} = tripEvent;
  const eventOffers = createEventOffer(offers);
  return (
    `<li class="trip-events__item">
            <div class="event">
                <div class="event__type">
                    <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type.toLowerCase()} icon">
                </div>
                <h3 class="event__title">${type} ${action} ${destination}</h3>

                <div class="event__schedule">
                    <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">
                        ${parseTime(startDate)}
                        </time>
                        —
                        <time class="event__end-time" datetime="2019-03-18T11:00">
                        ${parseTime(endDate)}
                        </time>
                    </p>
                    <p class="event__duration">30M</p>
                </div>

                <p class="event__price">
                    €&nbsp;<span class="event__price-value">${price}</span>
                </p>

                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${eventOffers}
                </ul>

                <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                </button>
            </div>
        </li>`
  );
};

export default class TripEvent extends AbstractComponent {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
  }

  getTemplate() {
    return getTripEvent(this._tripEvent);
  }

  setClickHandler(handler) {
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
