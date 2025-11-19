import { shuffle, isMatch, generateDeck } from './gameUtils';

describe('gameUtils', () => {
  test('shuffle returns array with same elements', () => {
    const arr = [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }];
    const shuffled = shuffle(arr);
    expect(shuffled).toHaveLength(arr.length);
    const originalSet = arr.map((x) => x.v).sort();
    const newSet = shuffled.map((x) => x.v).sort();
    expect(newSet).toEqual(originalSet);
  });

  test('isMatch detects equal values and ignores same index', () => {
    const deck = [{ value: 'A' }, { value: 'B' }, { value: 'A' }];
    expect(isMatch(deck, 0, 2)).toBe(true);
    expect(isMatch(deck, 1, 2)).toBe(false);
    expect(isMatch(deck, 0, 0)).toBe(false);
  });

  test('generateDeck creates pairs and shuffles', () => {
    const deck = generateDeck(6);
    expect(deck).toHaveLength(12);
    const values = deck.map((c) => c.value);
    const counts = values.reduce((acc, v) => {
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {});
    Object.values(counts).forEach((count) => expect(count).toBe(2));
  });
});
