// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { GenericError } from "./GenericError.js";

export class SequelizeError extends GenericError {
  constructor(code: string, e: any) {
    super(code, {
      name: "SequelizeError",
      status: 500,
      stack: e.stack,
      message: e.original?.message ?? e.message,
      data: { name: e.name, sql: e.sql, original: e.original },
    });
  }
}
