// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import express from "express";
import { serve, setup } from "swagger-ui-express";
import { default as PromiseRouter } from "express-promise-router";

export function openApiRouter(document) {
  const docs = PromiseRouter();
  docs.use(`/open-api.json`, (_, res) => res.json(document));
  docs.use(
    "/",
    express.static("node_modules/swagger-ui-dist/", { index: false }),
    serve,
    setup(undefined, {
      swaggerUrl: "open-api.json",
      customCss: ".swagger-ui .topbar { display: none }",
      customJsStr: 'document.title="' + document.info.title + '"',
    })
  );
  return docs;
}
