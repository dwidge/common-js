// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const { stringify } = JSON;

export function expect<T>(result: T): {
  toMatchObject: (expectedObject: Partial<T>) => void;
  toEqual: (expectedValue: T) => void;
} {
  return {
    toMatchObject: (expectedObject: Partial<T>) => {
      for (const key in expectedObject) {
        if (expectedObject.hasOwnProperty(key)) {
          if (result[key] !== expectedObject[key]) {
            throw new Error(
              `Expected ${stringify(key)} to be ${stringify(
                expectedObject[key]
              )}, but got ${stringify(result[key])}`
            );
          }
        }
      }
    },
    toEqual(expectedValue: T) {
      if (!deepEqual(result, expectedValue)) {
        throw new Error(
          `Expected value to be ${stringify(
            expectedValue
          )}, but got ${stringify(result)}`
        );
      }
    },
  };
}

function deepEqual<T>(a: T, b: T): boolean {
  if (a === b) {
    return true;
  }

  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a) as (keyof T)[];
  const keysB = Object.keys(b) as (keyof T)[];

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
