// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const appendQueryToUrl = (
  url: string,
  items: Record<string, string>
) => {
  const [urlWithoutQuery, oldQueryString] = url.split("?");
  const oldQueryObject = Object.fromEntries(
    new URLSearchParams(oldQueryString).entries()
  );
  const newQuery = new URLSearchParams({ ...oldQueryObject, ...items });
  return urlWithoutQuery + "?" + newQuery;
};
