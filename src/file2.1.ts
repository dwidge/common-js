// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { File2Get, File2Set, File2Key, File2Filter } from "@dwidge/types";
import { GetQueryOptions } from "@dwidge/query";
import { zodToParameters } from "../utils/zodParameters.js";
import { makeApi } from "@zodios/core";
import { errors } from "./errors.js";
import { z } from "zod";

export const File2Api = makeApi([
  {
    method: "get",
    path: `/`,
    alias: `getFile2List`,
    description: `Get File2 list`,
    parameters: [
      ...zodToParameters("Query", File2Filter),
      ...zodToParameters("Query", GetQueryOptions),
      {
        name: "Authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: File2Get.array(),
    errors,
  },
  {
    method: "put",
    path: `/`,
    alias: `setFile2List`,
    description: `Set File2 list`,
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: File2Set.array(),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: File2Key.nullable().array(),
    errors,
  },
]);
