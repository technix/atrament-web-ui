export default function arrayShuffle(array) {
  if (!Array.isArray(array)) {
    throw new TypeError(`Expected an array, got ${typeof array}`);
  }

  if (array.length === 0) {
    return [];
  }

  const shuffled = JSON.parse(JSON.stringify(array));

  for (let index = shuffled.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[newIndex]] = [shuffled[newIndex], shuffled[index]];
  }

  return shuffled;
}
