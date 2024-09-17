// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const omitNull = <T extends { [index: string]: any }>(
  object: T
): { [K in keyof T]: Exclude<T[K], null> } => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, val]) => val !== null)
  ) as { [K in keyof T]: Exclude<T[K], null> };
};
