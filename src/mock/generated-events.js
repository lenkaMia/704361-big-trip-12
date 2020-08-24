import {EVENT_TYPES, DESTINATIONS, OFFERS, EVENT_ACTIONS_MAP} from "../consts.js";
import {getRandomInteger, getRandomArrayItem, getRandomArray} from "../utils/utils.js";

const EVENTS_COUNT = 15;

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const descriptionSentences = descriptionText.split(`. `);

const getRandomDate = () => {
  return (
    Date.now() +
    1 +
    Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000
  );
};

const generateTripEvent = () => {
  const type = getRandomArrayItem(EVENT_TYPES);
  const startDate = getRandomDate();
  const endDate = getRandomDate();
  const aviableOffers = getRandomArray(OFFERS, 0);
  return {
    type,
    destination: getRandomArrayItem(DESTINATIONS),
    price: getRandomInteger(10, 200),
    action: EVENT_ACTIONS_MAP[type],
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    offers: getRandomArray(aviableOffers, 0),
    aviableOffers,
    description: getRandomArray(descriptionSentences, 1, 5).join(`. `),
    photos: new Array(getRandomInteger(1, 8))
      .fill(``)
      .map(() => `http://picsum.photos/248/152?r=${Math.random()}`),
    isFavorite: false
  };
};

const generateTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map((_) => generateTripEvent())
    .sort(
        (currentEvent, nextEvent) => currentEvent.startDate - nextEvent.startDate
    );
};

export const generetedEvents = generateTripEvents(EVENTS_COUNT);
