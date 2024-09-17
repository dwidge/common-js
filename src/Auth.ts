// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";
import { Id } from "./Id.js";

export const Auth = z.object({
  companyId: Id.nullable(),
  userId: z.string(),
  roleId: z.number(),
});
export type Auth = z.infer<typeof Auth>;
