// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { string, object, literal, number, boolean } from "zod";

export const Id = number().int().nonnegative();
export const NumericString = string().regex(/^\d+$/).transform(Number);
