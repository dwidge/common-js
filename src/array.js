// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

/**
 * SetAt - sets the value at the specified index in an array to the provided
 * value
 *
 * @param {function | any} calc - The value to set at the specified index, can
 *   be a function to calculate the value
 * @param {number} i - The index in the array to set the value at
 * @param {array} prev - The array to set the value in
 * @returns {array} The modified array
 */
export const setAt = (calc, i) => (prev) => {
  const next = [...prev];
  next[i] = typeof calc === "function" ? calc(next[i]) : calc;
  return next;
};

/**
 * Append - appends the provided values to the end of an array
 *
 * @param {...any} items - The values to append to the array
 * @param {array} prev - The array to append the values to
 * @returns {array} The modified array
 */
export const append =
  (...items) =>
  (prev) =>
    [...prev, ...items];

/**
 * Splice - removes the specified number of items from the array starting at the
 * specified index
 *
 * @param {number} index - The index to start removing items from
 * @param {number} length - The number of items to remove
 * @param {array} prev - The array to remove items from
 * @returns {array} The modified array
 */
export const splice = (index, length) => (prev) => {
  if (prev.length >= index + length) {
    const next = [...prev];
    next.splice(index, length);
    return next;
  }
  return prev;
};

/**
 * Fill - creates a new array with the specified length and fills it with the
 * provided values
 *
 * @param {number} length - The length of the array to create
 * @param {function} f - A function to calculate the value for each index in the
 *   array
 * @returns {array} The new array
 */
export function fill(length, f) {
  const a = [];
  for (let i = 0; i < length; i++) {
    a.push(f(i));
  }
  return a;
}
