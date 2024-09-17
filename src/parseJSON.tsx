// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const parseJSON = (s: string) => {
  try {
    return JSON.parse(s);
  } catch (e) {
    return s;
  }
};

export const formatJSON = (s: string) => {
  return JSON.stringify(parseJSON(s), null, 2);
};
