const eventOffer = (offers) => {
  return offers.map ((offer) => {
    const {type, title, price} = offer;
    const isChecked = Math.random () > 0.5;

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

export const getOffers = (offers) => {
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

