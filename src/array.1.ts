// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const uniqueItems = <T>(list: T[], getProp: (v: T) => string) =>
  unique(list.map(getProp)).map((id) => list.find((v) => getProp(v) === id));

export const unique = <T>(a: T[]) => [...new Set(a)];
