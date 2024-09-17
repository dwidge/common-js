// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { fromZodError } from "zod-validation-error";
import { InvalidBodyError } from "./Error.js";
import { ZodError } from "zod";

export function validationErrorHandler(err, req, res, next) {
  // res.status(422).send(fromZodError(new ZodError(err.error)).message);
  throw new InvalidBodyError(
    "validationErrorHandler1",
    fromZodError(new ZodError(err.error)).message
  );
}
