/**
 * Generates a deck of pairs using given symbols and requested pair count.
 * Returns an array of objects: { value: string }
 */
export function generateDeck(pairCount = 8) {
  const baseSymbols = [
    '🐶', '🐱', '🦊', '🐼', '🦁', '🐸', '🐵', '🦄',
    '🐨', '🐯', '🐷', '🐔', '🐙', '🦋', '🌸', '🍀',
    '🍉', '🍋', '🍇', '🍎', '🚗', '✈️', '🚀', '⚽️',
  ];
  const symbols = baseSymbols.slice(0, pairCount);
  const deck = symbols.flatMap((s) => [{ value: s }, { value: s }]);
  return shuffle(deck);
}

/**
 * Fisher-Yates shuffle; returns a new array (does not mutate input).
 */
// PUBLIC_INTERFACE
export function shuffle(inputArray) {
  const arr = inputArray.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}

/**
 * Checks if two indices in deck match by value.
 */
// PUBLIC_INTERFACE
export function isMatch(deck, i, j) {
  if (i === j) return false;
  const a = deck[i];
  const b = deck[j];
  return Boolean(a && b && a.value === b.value);
}
