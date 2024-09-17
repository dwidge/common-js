// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { zodiosRouter } from "@zodios/express";
import PromiseRouter from "express-promise-router";
import { validationErrorHandler } from "../../utils/validation.js";
import { File2Api } from "@dwidge/api";
import { getFile2List, setFile2List } from "./table.js";
import { authFromToken } from "../../utils/authToken.js";
import { File2Filter } from "@dwidge/types";
import {
  getQueryFromUrl,
  GetQueryOptions,
  toDbQueryOptions,
} from "@dwidge/query";

export const file2Router = zodiosRouter(File2Api, {
  router: PromiseRouter(),
  validationErrorHandler,
});
const r = file2Router;

r.get("/", async (req, res) => {
  const query = getQueryFromUrl(req.url);
  const auth = await authFromToken(req.headers.authorization);
  const options = toDbQueryOptions(GetQueryOptions.parse(query));
  const { rows, count, offset } = await getFile2List(
    File2Filter.parse(query),
    auth,
    options
  );

  res.appendHeader(
    "Content-Range",
    "items " + offset + "-" + (offset + count - 1) + "/" + count
  );
  res.status(206).send(rows);
});

r.put("/", async (req, res) =>
  res.json(
    await setFile2List(req.body, await authFromToken(req.headers.authorization))
  )
);
