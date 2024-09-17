// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";

export const Login = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
export type Login = z.infer<typeof Login>;
