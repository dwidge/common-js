// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// Modified by DWJ
// Original from
// https://github.com/TanStack/query/issues/2304#issuecomment-1234979421

import {
  MutationFunction,
  MutationKey,
  UseMutationOptions,
  UseMutationResult,
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useCustomMutation = <
  TData = unknown,
  TError = Error,
  TVariables = unknown,
  TContext = unknown,
>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationKey" | "mutationFn"
  >,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const queryClient = useQueryClient();
  const query = useQuery<TData, TError>(
    mutationKey,
    async () => await Promise.resolve(null as unknown as TData),
    { retry: false, cacheTime: Infinity, staleTime: Infinity },
  );
  const queryError = useQuery<TError, TData>(
    ["CustomMutationError", ...mutationKey],
    async () => await Promise.resolve(null as unknown as TError),
    { retry: false, cacheTime: Infinity, staleTime: Infinity },
  );
  const mutation = useMutation<TData, TError, TVariables, TContext>(
    mutationKey,
    async (...params) => {
      queryClient.setQueryData(["CustomMutationError", ...mutationKey], null);
      return await mutationFn(...params);
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData(mutationKey, data);
        if (options?.onSuccess) options.onSuccess(data, variables, context);
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData(["CustomMutationError", ...mutationKey], err);
        if (options?.onError) options.onError(err, variables, context);
      },
    },
  );
  const isLoading = useIsMutating(mutationKey);

  // We need typecasting here due the ADT about the mutation result, and as we're using a data not related to the mutation result
  // The typescript can't infer the type correctly.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    ...mutation,
    reset: () => {
      queryClient.setQueryData(mutationKey, null);
    },
    data: query.data,
    isLoading: !!isLoading,
    error: queryError.data,
    isError: !!queryError.data,
  } as UseMutationResult<TData, TError, TVariables, TContext>;
};
