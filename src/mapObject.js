// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

module.exports.mapObject = (object, predicate) =>
  Object.fromEntries(Object.entries(object).map(predicate));
