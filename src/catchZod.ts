// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ZodError } from "zod";
import { InvalidError } from "./InvalidError.js";

export const catchZod = (code: string) => (e: unknown) => {
  if (e instanceof ZodError)
    throw new InvalidError(
      code,
      Object.fromEntries(e.issues.map((e) => [e.path.join("."), e.message]))
    );
  throw e;
};
