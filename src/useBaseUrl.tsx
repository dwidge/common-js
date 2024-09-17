// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import useSWR from "swr";

export function useBaseUrl() {
  const { data: baseUrl, mutate } = useSWR<string>("baseUrl");
  const setBaseUrl = (v?: string) => mutate(v);
  return [baseUrl, setBaseUrl] as const;
}
