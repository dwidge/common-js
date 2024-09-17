// Copyright DWJ 2023.
// Made with ChatGPT.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { traverseObject } from "./traverseObject.js";

export function findDuplicateKeys(arr, key = undefined) {
  const occurrences = {};

  function trackOccurrences(value, where) {
    if (key && where.at(-1) !== key) return;
    const path = where.map((k) => (typeof k === "number" ? 0 : k)).join(".");
    if (!occurrences[path]) occurrences[path] = {};
    if (!occurrences[path][value])
      occurrences[path][value] = { value, where: [] };

    occurrences[path][value].where.push(where);
  }

  traverseObject(arr, trackOccurrences);

  return Object.values(occurrences).flatMap((o) =>
    Object.values(o).filter(({ where }) => where.length > 1)
  );
}

function findDuplicateKeys2(key, input, path = "", seen = new Set()) {
  const duplicates = input.flatMap((obj, i) => {
    const value = obj[key];
    const currentPath = `${path}[${i}].${key}`;

    if (typeof value === "object" && value !== null) {
      return findDuplicateKeys(key, value, `${currentPath}`, seen);
    }

    return seen.has(value)
      ? { paths: [...seen].filter((p) => p !== currentPath), value }
      : () => seen.add(currentPath);
  });

  return duplicates.filter(Boolean);
}
