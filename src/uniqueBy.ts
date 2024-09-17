// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const uniqueBy = (key) => (total, v) => {
  total[v[key]] = v;
  return total;
};
