import {EVENT_TYPES, DESTINATIONS} from "../consts.js";
import AbstractComponent from "./abstract-component.js";
import {parseDate} from "../utils/utils.js";

const renderOptions = (destination) => {
  return destination.map((city) => {
    return (`<option value="${city}"></option>`);
  })
  .join(`\n`);
};

const renderPhotos = (photos) => {
  return photos.map((photo) => {
    return (`<img class="event__photo" src="${photo}" alt="Event photo">`);
  })
    .join(`\n`);
};

const eventTypeList = (types) => {
  return types.map((type) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
      </div>`
    );
  })
    .join(`\n`);
};

const eventOffer = (offers) => {
  return offers.map((offer) => {
    const {type, title, price} = offer;
    const isChecked = Math.random() > 0.5;

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}"
        ${isChecked ? `checked` : ``}
        >
        <label class="event__offer-label" for="event-offer-${type}-1">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  })
    .join(``);
};

const getOffers = (offers) => {
  const eventOffers = eventOffer(offers);
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${eventOffers}
      </div>
    </section>`
  );
};

const tripEdittor = (tripEvent) => {
  const {type, destination, description, offers, action, photos, startDate, endDate} = tripEvent;
  const typesTransferList = eventTypeList(EVENT_TYPES.slice(0, 7));
  const typesActivitiesList = eventTypeList(EVENT_TYPES.slice(7, 10));
  const tripOptions = renderOptions(DESTINATIONS);
  const tripOffers = getOffers(offers);
  const tripPhoto = renderPhotos(photos);
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type.toLowerCase()} icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    <div class="event__type-item">
                      ${typesTransferList}
                    </div>
                  </fieldset>
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    <div class="event__type-item">
                      ${typesActivitiesList}
                    </div>
                  </fieldset>
                </div>
              </div>
              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type} ${action}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${tripOptions}
                </datalist>
              </div>
              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${parseDate(startDate)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${parseDate(endDate)}">
              </div>
              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>
              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>
              <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
              <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                        </svg>
              </label>
              <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
              </button>
            </header>
            <section class="event__details">
              ${tripOffers}
              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>
                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${tripPhoto}
                  </div>
                </div>
              </section>
            </section>
          </form>`
  );
};

export default class TripEdittor extends AbstractComponent {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
  }

  getTemplate() {
    return tripEdittor(this._tripEvent);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement()
      .querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);
  }
}
