// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { GenericError } from "./GenericError.js";

export class InvalidError extends GenericError {
  constructor(code: string, data: any) {
    super(code, {
      name: "InvalidError",
      status: 422,
      message: "Invalid data",
      data,
    });
  }
}
