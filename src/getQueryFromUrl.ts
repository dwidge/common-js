// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export function getQueryFromUrl(
  url: string
): Record<string, string | null | undefined> {
  return Object.fromEntries(
    [...new URLSearchParams(url.split("?")[1] ?? "").entries()].map(
      ([k, v]) => [k, v === "" ? undefined : v === "%00" ? null : v]
    )
  );
}
