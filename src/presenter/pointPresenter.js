import TripEvent from "../components/trip-event.js";
import TripEventForm from "../components/trip-event-form.js";
import {renderElement, RenderPosition, replace, remove} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`
};

export default class PointPresenter {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._tripEventComponent = null;
    this._tripEventFormComponent = null;
    this._mode = Mode.DEFAULT;
  }

  render(tripEvent) {
    const oldTripEventComponent = this._tripEventComponent;
    const oldTripEventFormComponent = this._tripEventFormComponent;

    this._tripEventComponent = new TripEvent(tripEvent);
    this._tripEventFormComponent = new TripEventForm(tripEvent);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        this._replaceTripEventFormToTripEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._tripEventComponent.setClickHandler(() => {
      this._replaceTripEventToTripFormEvent();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._tripEventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceTripEventFormToTripEvent();
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
    // Нужен ли тут этот функционал?
    // remove(oldTripEventComponent);
    // remove(oldTripEventFormComponent);
  }
  destroy() {
    remove(this._tripEventComponent);
    remove(this._tripEventFormComponent);
  }

  _replaceTripEventFormToTripEvent() {
    replace(this._tripEventComponent, this._tripEventFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceTripEventToTripFormEvent() {
    this._onViewChange();
    replace(this._tripEventFormComponent, this._tripEventComponent);
    this._mode = Mode.EDIT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceTripEventFormToTripEvent();
    }
  }
}
