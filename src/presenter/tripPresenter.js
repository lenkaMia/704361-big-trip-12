import Sorting from "../components/trip-sort.js";
import DayItem from "../components/day-item.js";
import NoEventText from "../components/no-event-text.js";
import DaysContainer from "../components/days-container.js";
import {renderElement, RenderPosition} from "../utils/render.js";
import {SortType} from "../mock/sort-type.js";
import PointPresenter from "./pointPresenter.js";

const renderEventCards = (events, container, onDataChange, isDefaultSorting = true) => {
  const dates = isDefaultSorting
    ? [...new Set(events.map((item) => new Date(item.startDate).toDateString()))] : [true];

  dates.forEach((date, dateIndex) => {
    const day = isDefaultSorting
      ? new DayItem(new Date(date), dateIndex + 1) : new DayItem();

    events
      .filter((_tripEvent) => {
        return isDefaultSorting
          ? new Date(_tripEvent.startDate).toDateString() === date : _tripEvent;
      })
      .forEach((_tripEvent) => {
        const pointPresenter = new PointPresenter(day.getElement().querySelector(`.trip-events__list`), onDataChange);
        pointPresenter.render(_tripEvent);
      });

    renderElement(container, day, RenderPosition.BEFOREEND);
  });
};

export default class TripPresenter {
  constructor(container) {
    this._container = container;
    this._sorting = new Sorting();
    this._noEventText = new NoEventText();
    this._daysContainer = new DaysContainer();

    this._onDataChange = this._onDataChange.bind(this);

    this._events = [];
  }

  init(events) {
    if (this._events.length === 0) {
      this._events = events;
    }

    if (events.length === 0) {
      renderElement(
          this._container,
          this._noEventText,
          RenderPosition.BEFOREEND
      );
      return;
    }

    renderElement(
        this._container,
        this._sorting,
        RenderPosition.AFTERBEGIN);

    renderElement(
        this._container,
        this._daysContainer,
        RenderPosition.BEFOREEND);

    renderEventCards(events, this._daysContainer.getElement(), this._onDataChange);

    this._sorting.setSortChangeHandler((sortType) => {
      let sortedEvents = [];
      let isDefaultSorting = false;

      switch (sortType) {
        case SortType.DATE_DOWN:
          sortedEvents = events.slice();
          isDefaultSorting = true;
          break;
        case SortType.TIME_DOWN:
          sortedEvents = events.slice().sort((a, b) => b.startDate - a.startDate);
          break;
        case SortType.PRICE_DOWN:
          sortedEvents = events.slice().sort((a, b) => b.price - a.price);
          break;
      }

      this._daysContainer.getElement().innerHTML = ``;
      renderEventCards(
        sortedEvents,
        this._daysContainer.getElement(),
        this._onDataChange,
        isDefaultSorting);
    });

    const getFullPrice = events.reduce((acc, item) => acc + item.price, 0);

    document.querySelector(`.trip-info__cost-value`).textContent = getFullPrice;
  }

  _onDataChange(oldData, newData, pointPresenter) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this.events = [
      ...this._events.slice(0, index),
      newData,
      ...this._events.slice(index + 1)
    ];

    pointPresenter.render(this._events[index]);
  }
}
