// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";

export const Id = z
  .string()
  .min(5)
  .regex(/^[a-zA-Z0-9_]*$/);
