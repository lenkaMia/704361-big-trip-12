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
