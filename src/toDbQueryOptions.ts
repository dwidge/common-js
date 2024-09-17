// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { DbQueryOptions, GetQueryOptions } from "./Query.js";

export const toDbQueryOptions = ({
  _offset: offset,
  _limit: limit,
  _order: order,
}: GetQueryOptions): DbQueryOptions => ({
  offset,
  limit,
  order: order
    ? ((order instanceof Array ? order : [order]).map((c) => c.split(".")) as [
        ...string[],
        "ASC" | "DESC"
      ][])
    : undefined,
});
