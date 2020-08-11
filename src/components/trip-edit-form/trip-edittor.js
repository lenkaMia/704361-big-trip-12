import {EVENT_TYPES, DESTINATIONS} from "../trip-events/trip-event-data.js";
import {getOffers} from "./get-offers.js";
import {eventTypeList} from "./event-types-list.js";

const getOptions = (destination) => {
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

export const tripEdittor = (tripEvent) => {
  const {type, destination, description, offers, action, photos} = tripEvent;
  const typesTransferList = eventTypeList(EVENT_TYPES.slice(0, 7));
  const typesActivitiesList = eventTypeList(EVENT_TYPES.slice(7, 10));
  const tripOptions = getOptions(DESTINATIONS);
  const tripOffers = getOffers(offers);
  const tripPhoto = renderPhotos(photos);
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
              </div>
              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>
              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
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
