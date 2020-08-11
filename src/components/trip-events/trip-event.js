import {createEventOffer} from './create-event-offer.js';

export const tripEvent = (item) => {
    const {type, destination, price, offers, action} = item;
    const eventOffers = createEventOffer(offers);
    console.log(type);
    return (
    `<li class="trip-events__item">
            <div class="event">
                <div class="event__type">
                    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
                </div>
                <h3 class="event__title">${type} ${action} ${destination}</h3>

                <div class="event__schedule">
                    <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
                        —
                        <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
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
