// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { makeApi } from "@zodios/core";
import { z } from "zod";
import { errors } from "./errors.js";
import { Alphanumeric } from "@dwidge/types";

export const fileApi = makeApi([
  {
    method: "get",
    path: "/",
    alias: "getFileGroups",
    description: "Get file group list",
    parameters: [
      {
        name: "authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: z.string().array(),
    errors,
  },
  {
    method: "get",
    path: "/:id",
    alias: "getFiles",
    description: "Get item file list",
    parameters: [
      { type: "Path", name: "id", schema: Alphanumeric },
      {
        name: "authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: z.string().array(),
    errors,
  },
  {
    method: "get",
    path: "/:id/:name",
    alias: "getFile",
    description: "Get item file",
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
    method: "put",
    path: "/:id",
    alias: "updateFile",
    description: "Update item files",
    requestFormat: "form-data",
    parameters: [
      { type: "Path", name: "id", schema: Alphanumeric },
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
    method: "delete",
    path: "/:id",
    alias: "deleteFileGroup",
    description: "Delete file group",
    parameters: [
      { type: "Path", name: "id", schema: Alphanumeric },
      {
        name: "authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: z.string(),
    errors,
  },
]);
