// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { serve, setup } from "swagger-ui-express";
import PromiseRouter from "express-promise-router";

export function makeOpenApiUi(openapiDoc) {
  const docs = PromiseRouter();
  docs.use(`/open-api.json`, (_, res) => res.json(openapiDoc));
  docs.use("/", serve);
  docs.use(
    "/",
    setup(undefined, {
      swaggerUrl: "open-api.json",
      customCss: ".swagger-ui .topbar { display: none }",
      customJsStr: 'document.title="' + openapiDoc.info.title + '"',
    })
  );
  return docs;
}
