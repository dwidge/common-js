// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export function replace<T>(
  array: T[],
  condition: (v: T, i: number, a: T[]) => boolean,
  replacer: (v: T, i: number, a: T[]) => T
) {
  return array.map((item, i, a) =>
    condition(item, i, a) ? replacer(item, i, a) : item
  );
}

export function upsert<T>(
  array: T[],
  condition: (v: T, i: number, a: T[]) => boolean,
  replacer: (v: T, i: number, a: T[]) => T
) {
  const index = array.findIndex(condition);
  const newItem = replacer(array[index], index, array);
  return index < 0
    ? [...array, newItem]
    : array.map((item, i) => (i === index ? newItem : item));
}

export const sum = (t: number, a: number) => t + a;

export const max = (t: number, a: number) => Math.max(t, a);
