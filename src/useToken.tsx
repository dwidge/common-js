// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { jwtDecode } from "jwt-decode";
import { User } from "@dwidge/api/types/User";
import { mainApiClient } from "./mainApi";
import { useCustomMutation } from "./useMutationState";
import { useQueryClient } from "@tanstack/react-query";

export const useLogin = (): {
  data?: string;
  error?: Error;
  busy: boolean;
  mutate: (v: {
    email: string;
    password: string;
    long?: boolean | undefined;
  }) => Promise<string>;
  reset: () => void;
} => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, mutateAsync, reset } = useCustomMutation(
    ["token"],
    mainApiClient.login,
    {
      onSuccess: () =>
        setTimeout(
          () =>
            queryClient.resetQueries({
              predicate: (query) => query.queryKey[0] !== "token",
            }),
          100
        ),
    }
  );
  return {
    data,
    error: error ?? undefined,
    busy: isLoading,
    mutate: mutateAsync,
    reset,
  };
};

export const useToken = () => useLogin().data;

export const useUser = (): User | undefined => {
  const token = useToken();
  return token ? jwtDecode<User>(token) : undefined;
};
