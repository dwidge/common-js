// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const useFilterQuery = <
  T extends Record<string, string | number | boolean | Date | null | undefined>
>(
  filter?: T
) =>
  filter
    ? [
        new URLSearchParams(
          Object.fromEntries(
            Object.entries(filter)
              .filter(([k, v]) => v !== undefined)
              .map(([k, v]) => [
                k,
                v == null ? "%00" : encodeURIComponent(v.toString()),
              ])
          )
        ).toString(),
        ...Object.entries(filter)
          .filter(([k, v]) => v === undefined)
          .map(([k, v]) => k),
      ].join("&")
    : "";
