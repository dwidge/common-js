// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import shuffleArray from "array-shuffle";
import randomInt from "random-int";

/**
 * Repeats an array until the given length.
 *
 * @param {array<any>} pattern
 * @param {int} length Total length; can be non multiple of pattern length
 */

export const extendSequence = (pattern: number[] = [], length = 10): number[] =>
  repeatArray(pattern, Math.ceil(length / pattern.length)).slice(0, length);
/**
 * Returns an array of ascending integers i where each is repeated series[i]
 * times.
 *
 * @param {array<int>} series Repeats of each number
 */

export const ascendingSequence = (series = [1, 2]): number[] =>
  series.flatMap((n, i) => Array(+n).fill(i));
/**
 * @param {int} length Length of sequence
 * @param {int} duplicates How many of the same symbol can appear
 */

export const randomSequence = (length = 2, duplicates = 1) => {
  const series = Array(length)
    .fill(0)
    .map((_v, i) => i);
  const pool = repeatArray(series, duplicates);
  return shuffleArray(pool).slice(0, length);
};
const repeatArray = <T>(series: T[], duplicates: number) =>
  Array(duplicates)
    .fill(0)
    .flatMap(() => series);
export const uniqueArray = <T>(items: T[]) => [...new Set(items)];
/**
 * Replaces indexes with symbols.
 *
 * @param {array<int>} sequence Indexes; an index can be larger than the number
 *   of symbols, it will wrap
 * @param {array<any>} symbols Replacements; shuffle it before passing to
 *   randomize symbols
 */

export const mapSequence = <T>(sequence: number[], symbols: T[]) =>
  sequence.map((t) => symbols[t % symbols.length]);
/**
 * @param {int} position If positive, from beg; if negative, from end; if
 *   undefined, random
 */
export const getIndex = (length: number, position: number) => {
  const anywhere = randomInt(length - 1);
  const frombeg = position;
  const fromend = position + length;
  return position == null ? anywhere : position >= 0 ? frombeg : fromend;
};
