// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export function partition(array, cond) {
  return array.reduce((total, item, i) => {
    const g = (total[cond(item, i, array)] ||= []);
    g.push(item);
    return total;
  }, {});
}
