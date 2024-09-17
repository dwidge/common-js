// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import Router from "express-promise-router";
import { zodiosRouter } from "@zodios/express";
import { validationErrorHandler } from "../utils/validation.js";
import { shareApi } from "@dwidge/api";
import { loadItemFile } from "./File.js";
import assert from "assert";
import { NotAuthorizedError } from "../utils/Error.js";
import { authToken } from "../utils/authToken.js";
import { createFileShareLink, createShareHash } from "./createFileShareLink.js";

export const shareRouter = zodiosRouter(shareApi, {
  router: Router(),
  validationErrorHandler,
});

shareRouter.get("/url/file/:id/:name", async (req, res) => {
  authToken(req.headers.authorization);
  // todo: check permissions
  const { id, name } = req.params;
  res.send(createFileShareLink(id, name));
});

shareRouter.get("/file/:id/:name", async (req, res) => {
  const { id, name } = req.params;
  const { hash } = req.query;
  assert.strictEqual(
    createShareHash(id + name),
    hash,
    new NotAuthorizedError("shareRouterGet1")
  );
  const fileStream = await loadItemFile(id, name);
  fileStream.pipe(res);
});
