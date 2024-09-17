// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { AxiosError } from "axios";
import { GenericError } from "./GenericError.js";
import { SequelizeError } from "./SequelizeError.js";

export const catchError =
  (code: string, { message = "", data = {} } = {}, Type = GenericError) =>
  (e: unknown) => {
    if (e instanceof GenericError) {
      throw new Type(code, {
        ...e,
        message: message || e.message,
        data: { ...e.data, ...data },
      });
    }
    if (e instanceof Error) {
      throw new Type(code, {
        ...e,
        message: message || e.message,
        stack: e.stack,
        data: { cause: e.cause, ...data },
      });
    }
    throw new Type(code, {
      message,
      data,
    });
  };

export const catchSequelize = (code: string) => (cause: unknown) => {
  throw new Error(cause instanceof Error ? code + ": " + cause.message : code, {
    cause,
  });
  // throw new SequelizeError(code, cause);
};

export const catchAxios = (code: string) => (e: unknown) => {
  throw e instanceof AxiosError
    ? new Error(e.response?.data ? code + ": " + e.response.data : code, {
        cause: {
          name: "AxiosError",
          message: e.message,
          status: e.response?.status,
          data: e.response?.data,
        },
      })
    : e;
};
