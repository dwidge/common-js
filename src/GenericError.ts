// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { cleanTrace } from "./cleanTrace.js";

export interface GenericError {
  code: string;
  name: string;
  message: string;
  status: number;
  stack: string;
  data?: any;
}

export class GenericError extends Error implements GenericError {
  code: string;
  status: number;
  data?: any;
  constructor(
    code = "",
    {
      name = "GenericError",
      message,
      status = 500,
      stack,
      data,
    }: {
      name?: string;
      message?: string;
      status?: number;
      stack?: string;
      data?: any;
    } = {}
  ) {
    super(message);
    this.code = code;
    this.name = name;
    this.status = status;
    this.stack = cleanTrace(stack || this.stack || new Error().stack || "");
    this.data = data;
  }
}
