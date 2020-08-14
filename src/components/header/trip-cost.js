import {createElement} from "../utils.js";

const tripCost = () => {
  return (
    `<p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

export default class TripCost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return tripCost();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}