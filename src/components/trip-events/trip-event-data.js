export const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const EVENT_ACTIONS_MAP = {
  'Taxi': `to`,
  'Bus': `to`,
  'Train': `to`,
  'Ship': `to`,
  'Transport': `to`,
  'Drive': `to`,
  'Flight': `to`,
  'Check-in': `in`,
  'Sightseeing': `in`,
  'Restaurant': `in`,
};
export const DESTINATIONS = [`Chamonix`, `Amsterdam`, `Paris`, `Geneva`, `Brugge`, `Berlin`];
export const OFFERS = [
  {
    type: `meal`,
    title: `Choose meal`,
    price: 10
  },
  {
    type: `comfort`,
    title: `Upgrade to comfort class`,
    price: 50
  },
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 15
  },
  {
    type: `seats`,
    title: `Choose a seat`,
    price: 20
  },
  {
    type: `train`,
    title: `Travel by train`,
    price: 35
  }
];

export const SORT_FILTERS = [
  { name: `event`, active: false },
  { name: `time`, active: true },
  { name: `price`, active: false },
];

export const MAIN_FILTERS = [
  { name: `everything`, active: true },
  { name: `future`, active: false },
  { name: `past`, active: false },
];