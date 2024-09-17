// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { makeApi } from "@zodios/core";
import { z } from "zod";
import { errors } from "./errors.js";
import { Alphanumeric } from "@dwidge/types";

export const shareApi = makeApi([
  {
    method: "get",
    path: "/url/file/:id/:name",
    alias: "getFileUrl",
    description: "getFileUrl",
    parameters: [
      { type: "Path", name: "id", schema: Alphanumeric },
      { type: "Path", name: "name", schema: Alphanumeric },
      {
        name: "authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: z.string(),
    errors,
  },
  {
    method: "get",
    path: "/file/:id/:name",
    alias: "getFileShare",
    description: "getFileShare",
    parameters: [
      { type: "Path", name: "id", schema: Alphanumeric },
      { type: "Path", name: "name", schema: Alphanumeric },
      { type: "Query", name: "hash", schema: z.string() },
    ],
    response: z.string(),
    errors,
  },
]);
