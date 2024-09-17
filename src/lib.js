// utils 1.0
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import format from "date-fns/format";
import randomInt from "random-int";

export const datestr = (d = new Date()) => {
  try {
    return format(d, "yyyy/MM/dd HH:mm");
  } catch (e) {}
};

export const objstr = (o) => <pre>{JSON.stringify(o, null, 2)}</pre>;

export const fillArray = (n, f) =>
  Array(n)
    .fill()
    .map((_, i) => f(i));

export const colors = "red green blue yellow violet cyan".split(" ");

export const pick = (a) => a[randomInt(a.length - 1)];

export const make2dArray = (w, h) => fillArray(h, () => fillArray(w, () => 0));

export const fill2dArrayWithN = (a, w, h, n) => {
  for (let i = 0; i < n; i++)
    for (let j = 0; j < 10; j++) {
      const x = randomInt(w - 1);
      const y = randomInt(h - 1);
      if (!a[y][x]) {
        a[y][x] = 1;
        break;
      }
    }
  return a;
};

export const rf = () => Math.random() * 2 - 1;
