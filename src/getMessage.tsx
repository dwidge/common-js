// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";

export const getMessage = (
  loading: string,
  success: string,
  {
    isLoading,
    isSuccess,
    error,
  }: {
    isLoading: boolean;
    isSuccess: boolean;
    error: null | Error | ZodiosError | AxiosError;
  }
) => {
  if (isLoading) return loading;
  if (isSuccess) return success;
  if (error) {
    if (error instanceof AxiosError && error.response?.data)
      return error.response.data.message;
    return error.message;
  }
};
