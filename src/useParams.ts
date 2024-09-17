// useParams 1.0
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import flatEntriesToTreeObject from "./tree.js";
export default function useParams(q = window.location.search, delimiter) {
  return flatEntriesToTreeObject(
    [...new URLSearchParams(q).entries()],
    delimiter
  );
}
