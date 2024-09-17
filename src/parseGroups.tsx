// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const parseGroups = (s: string) =>
  s
    .split("\n\n")
    .map((s) => s.trim())
    .filter((s) => s.length);
export const parseLines = (s: string[]) => s.map((s) => s.split("\n"));
