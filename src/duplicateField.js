// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// ChatGPT

export function assertNoDuplicateField(data, field = "id") {
  if (hasDuplicateField(data, field)) throw new Error(`Duplicate ${field}`);
}

export function assertNoDuplicateChildrenField(data, field = "id") {
  if (hasDuplicateFieldChildren(data, field))
    throw new Error(`Duplicate ${field}`);
}

export const hasDuplicateField = (array, field = "id") =>
  array.reduce((acc, curr) => {
    acc.add(curr[field]);
    return acc;
  }, new Set()).size !== array.length;

export const hasDuplicateFieldChildren = (array, field = "id") => {
  const checkDuplicates = (arr, seenValues = new Map()) => {
    for (const curr of arr) {
      if (curr[field]) {
        if (seenValues.has(curr[field])) {
          return true; // found a duplicate value
        } else {
          seenValues.set(curr[field], true);
        }
      }
      if (curr.children && checkDuplicates(curr.children, seenValues)) {
        return true; // found a duplicate value in the child nodes
      }
    }
    return false; // no duplicates found in this branch
  };
  return checkDuplicates(array);
};
