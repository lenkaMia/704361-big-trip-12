import TripEvent from "../components/trip-event.js";
import TripEdit from "../components/trip-edit.js";
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
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;
  }

  render(tripEvent) {
    const oldTripEventComponent = this._tripEventComponent;
    const oldTripEditComponent = this._tripEditComponent;

    this._tripEventComponent = new TripEvent(tripEvent);
    this._tripEditComponent = new TripEdit(tripEvent);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        this._replaceTripEditToTripEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._tripEventComponent.setClickHandler(() => {
      this._replaceTripEventToTripEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._tripEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceTripEditToTripEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._tripEditComponent.setFavoriteClickHandler(() => {
      const newTripEvent = Object.assign({}, tripEvent, {isFavorite: !tripEvent.isFavorite});
      this._onDataChange(tripEvent, newTripEvent, this);
    });

    if (oldTripEventComponent && oldTripEditComponent) {
      replace(this._tripEventComponent, oldTripEventComponent);
      replace(this._tripEditComponent, oldTripEditComponent);
    } else {
      renderElement(
          this._container,
          this._tripEventComponent,
          RenderPosition.BEFOREEND
      );
    }
    // remove(oldTripEventComponent);
    // remove(oldTripEditComponent);
  }
  destroy() {
    remove(this._tripEventComponent);
    remove(this._tripEditComponent);
  }

  _replaceTripEditToTripEvent() {
    replace(this._tripEventComponent, this._tripEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceTripEventToTripEdit() {
    this._onViewChange();
    replace(this._tripEditComponent, this._tripEventComponent);
    this._mode = Mode.EDIT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceTripEditToTripEvent();
    }
  }
}
