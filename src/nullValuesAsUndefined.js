// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export function nullValuesAsUndefined(object) {
  const result = {};
  for (const [key, value] of Object.entries(object)) {
    result[key] = value ?? undefined;
  }
  return result;
}

export function dateValuesAsString(object) {
  const result = {};
  for (const [key, value] of Object.entries(object)) {
    result[key] = value instanceof Date ? value.toISOString() : value;
  }
  return result;
}
