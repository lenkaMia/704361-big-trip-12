export const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length);

  return array[randomIndex];
};

export const getRandomArray = (array, start, end = array.length) => {
  const count = getRandomInteger(start, end);
  return new Array(count)
    .fill(``)
    .map(() => getRandomArrayItem(array));
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const parseTime = (UTCTimestamp) => {
  const date = new Date(UTCTimestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const parseDate = (UTCTimestamp) => {
  const date = new Date(UTCTimestamp);
  return `${date.getDate()}/${date.getMonth()}/${String(
    date.getFullYear()
  ).slice(2)}`;
};

export const getTripDuration = (start, end) => {
  const startDate = new Date(start);
  const startDay = startDate.getDate();
  const endDay = new Date(end).getDate();
  const month = startDate.toLocaleString(`en-US`, {
    month: `short`
  });

  return `${month} ${startDay}&nbsp;&mdash;&nbsp;${endDay}`;
};