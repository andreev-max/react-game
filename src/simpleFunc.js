export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
   //Максимум не включается, минимум включается
}

export function makeRandomArray(a, b) {
  return Math.random() - 0.5;
};