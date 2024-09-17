// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const dropUndefined = <T extends { [k: string]: any }>(o: T) =>
  Object.fromEntries(
    Object.entries(o).filter(([k, v]) => v !== undefined)
  ) as T;
