// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const parseSafeJson = (s: string) => {
  try {
    return JSON.parse(s);
  } catch (e) {
    return;
  }
};
