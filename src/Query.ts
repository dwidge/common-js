// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";

export const GetQueryOptions = z
  .object({
    _offset: z.coerce.number().int().min(0),
    _limit: z.coerce.number().int().min(0).max(1000),
    _order: z.union([z.string(), z.string().array()]),
    _history: z.string().length(0),
  })
  .partial();
export type GetQueryOptions = z.infer<typeof GetQueryOptions>;

export const DbQueryOptions = z
  .object({
    offset: z.number().int().min(0),
    limit: z.number().int().min(0).max(1000),
    order: z.string().min(1).max(32).array().array(),
    history: z.string().length(0),
  })
  .partial();
export type DbQueryOptions = z.infer<typeof DbQueryOptions>;
