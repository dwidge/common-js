// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const byId = (item) => (listItem) => item.id === listItem.id;

export const prependItem = (list) => (item) => {
  return [item, ...list];
};

export const upsertItem =
  (list, test = byId) =>
  (item) => {
    const i = list.findIndex(test(item));
    if (i < 0) return [item, ...list];
    return list.map((old, j) => (j === i ? item : old));
  };

export const removeItem =
  (list, test = byId) =>
  (item) => {
    return list.filter((listItem) => !test(item)(listItem));
  };

export const uniqueItems = (list, getProp = (v) => v?.id) =>
  unique(list.map(getProp)).map((id) => list.find((v) => getProp(v) === id));

export const remove = (a, i, n = 1) => {
  a.splice(i, n);
  return [...a];
};

export const random = (max) => (Math.random() * max) | 0;

export const pick = (a) => a[random(a.length)];

export const fill = (n, f) => [...new Array(n)].map((v, i) => f(i));

export const unique = (a) => [...new Set(a)];
