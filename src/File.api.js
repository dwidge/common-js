// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { makeApi, makeEndpoint } from "@zodios/core";
import { string, array } from "zod";
import { errors } from "../routes/ErrorResponse.js";

const GetFileGroups = makeEndpoint({
  method: "get",
  path: "/",
  alias: "getFileGroups",
  description: "Get file group list",
  response: array(string()),
  errors,
});

const GetFiles = makeEndpoint({
  method: "get",
  path: "/:id",
  alias: "getFiles",
  description: "Get item file list",
  response: array(string()),
  errors,
});

const GetFile = makeEndpoint({
  method: "get",
  path: "/:id/:name",
  alias: "getFile",
  description: "Get item file",
  response: string(),
  errors,
});

const PutFile = makeEndpoint({
  method: "put",
  path: "/:id",
  alias: "updateFile",
  description: "Update item files",
  requestFormat: "form-data",
  response: string(),
  errors,
});

const deleteFileGroup = makeEndpoint({
  method: "delete",
  path: "/:id",
  alias: "deleteFileGroup",
  description: "Delete file group",
  response: string(),
  errors,
});

export const fileApi = makeApi([
  GetFileGroups,
  deleteFileGroup,
  GetFiles,
  GetFile,
  PutFile,
]);
