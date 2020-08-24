import TripEvent from "../components/trip-event.js";
import TripEdittor from "../components/trip-edittor.js";
import {renderElement, RenderPosition, replace} from "../utils/render.js";

export default class PointPresenter {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  init(tripEvent) {
    const tripEventComponent = new TripEvent(tripEvent);
    const tripEdittorComponent = new TripEdittor(tripEvent);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replace(tripEventComponent, tripEdittorComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    renderElement(
        this._container,
        tripEventComponent,
        RenderPosition.BEFOREEND
    );

    tripEventComponent.setClickHandler(() => {
      replace(tripEdittorComponent, tripEventComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripEdittorComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      replace(tripEventComponent, tripEdittorComponent);
    });

    tripEdittorComponent.setFavoriteClickHandler(() => {
      const newTripEvent = Object.assign({}, tripEvent, {isFavorite: !tripEvent.isFavorite});
      this._onDataChange(tripEvent, newTripEvent);
    });
  }
}
