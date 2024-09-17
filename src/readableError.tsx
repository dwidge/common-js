// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export const readableError = (error: any) =>
  error.cause?.issues
    ? fromZodError(new ZodError((error.cause as any).issues))
    : error;
