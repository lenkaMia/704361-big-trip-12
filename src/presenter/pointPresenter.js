import TripEvent from "../components/trip-event.js";
import TripEventForm from "../components/trip-event-form.js";
import {renderElement, RenderPosition, replace} from "../utils/render.js";

export default class PointPresenter {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._tripEventComponent = null;
    this._tripEventFormComponent = null;
  }

  render(tripEvent) {
    const oldTripEventComponent = this._tripEventComponent;
    const oldTripEventFormComponent = this._tripEventFormComponent;

    this._tripEventComponent = new TripEvent(tripEvent);
    this._tripEventFormComponent = new TripEventForm(tripEvent);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replace(this._tripEventComponent, this._tripEventFormComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._tripEventComponent.setClickHandler(() => {
      replace(this._tripEventFormComponent, this._tripEventComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._tripEventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      replace(this._tripEventComponent, this._tripEventFormComponent);
    });

    this._tripEventFormComponent.setFavoriteClickHandler(() => {
      const newTripEvent = Object.assign({}, tripEvent, {isFavorite: !tripEvent.isFavorite});
      this._onDataChange(tripEvent, newTripEvent, this);
    });

    if (oldTripEventComponent && oldTripEventFormComponent) {
      replace(this._tripEventComponent, oldTripEventComponent);
      replace(this._tripEventFormComponent, oldTripEventFormComponent);
    } else {
      renderElement(
        this._container,
        this._tripEventComponent,
        RenderPosition.BEFOREEND
      );
    }
  }
}
