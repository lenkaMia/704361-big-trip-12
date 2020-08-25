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

const formatTime = (value) => {
  if (value === 0) {
    return `00`;
  } else if (value < 10) {
    return `0${value}`;
  }
  return value;
};

export const parseTime = (UTCTimestamp) => {
  const date = new Date(UTCTimestamp);
  return `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
};

export const parseDate = (UTCTimestamp) => {
  const date = new Date(UTCTimestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${String(
      date.getFullYear()
  ).slice(2)}`;
};

export const formatDate = (date) => {
  return `${
    (date && new Date(date).toLocaleString(`en-US`, {
      month: `short`
    })) || ``
  }
  ${ new Date(date).getDate() || `` }`;
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
