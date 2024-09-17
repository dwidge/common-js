// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import useSWR, { useSWRConfig } from "swr";
import { useClient } from "./useClient.js";
import useSWRMutation from "swr/mutation";

export function useLogin() {
  type Body = Parameters<typeof fetcher>[0];
  type Data = Awaited<ReturnType<typeof fetcher>>;

  const global = useSWRConfig();
  const fetcher = useClient().login;
  const { data } = useSWR<Data, Error, string>("login", null);
  const {
    trigger: mutate,
    isMutating: isLoading,
    error,
  } = useSWRMutation<Data, Error, string, Body>(
    "login",
    (key: string, { arg }) => fetcher(arg),
    { populateCache: true }
  );

  const login = (creds?: { email: string; password: string }) =>
    creds
      ? mutate(creds)
          .then(() => global.mutate((key) => key !== "login"))
          .then(() => {})
      : logout();
  const logout = () =>
    global
      .mutate((key) => true, undefined, { revalidate: false })
      .then(() => {});

  return { authorization: data, login, logout, error, isLoading };
}
