// flatEntriesToTreeObject 1.0
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export default function flatEntriesToTreeObject(entries, delimiter = ".") {
  return entries.reduce((tree, [key, value]) => {
    const parts = key.split(delimiter);
    const lastPart = parts.pop();
    const current = parts.reduce(
      (obj, part) => obj[part] || (obj[part] = {}),
      tree
    );
    current[lastPart] = value;
    return tree;
  }, {});
}
