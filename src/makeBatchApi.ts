// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ZodiosEndpointError, makeApi } from "@zodios/core";
import { z } from "zod";
import { capitalize } from "./capitalize.js";

export function makeBatchApi<
  T extends string,
  Full extends z.ZodObject<z.ZodRawShape>,
  Short extends z.ZodObject<z.ZodRawShape>,
  Create extends z.ZodObject<z.ZodRawShape>,
  Id extends z.ZodTypeAny,
  Err extends Array<ZodiosEndpointError>
>(
  resource: T,
  fullSchema: Full,
  shortSchema: Short,
  createSchema: Create,
  idType: Id,
  errors: Err
) {
  const capitalizedResource = capitalize(resource);
  return makeApi([
    {
      method: "get",
      path: `/`,
      // @ts-expect-error
      alias: `get${capitalizedResource}s`,
      description: `Search multiple ${resource}s`,
      parameters: [
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: shortSchema.array(),
      // @ts-expect-error
      errors,
    },
    {
      method: "put",
      path: `/`,
      // @ts-expect-error
      alias: `update${capitalizedResource}s`,
      description: `Set multiple ${resource}s`,
      parameters: [
        {
          name: "body",
          type: "Body",
          description: `The ${resource}s to set`,
          schema: createSchema.array() as z.ZodArray<z.Schema<z.input<Create>>>,
        },
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: shortSchema.array(),
      // @ts-expect-error
      errors,
    },
    {
      method: "delete",
      path: `/`,
      // @ts-expect-error
      alias: `delete${capitalizedResource}s`,
      description: `Delete multiple ${resource}s`,
      parameters: [
        {
          name: "body",
          type: "Body",
          description: `The ${resource}s to delete`,
          schema: shortSchema.partial().array() as z.ZodArray<
            z.Schema<Partial<z.input<Short>>>
          >,
        },
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: shortSchema.array(),
      // @ts-expect-error
      errors,
    },
    {
      method: "get",
      path: `/:id`,
      // @ts-expect-error
      alias: `get${capitalizedResource}`,
      description: `Get a specific ${resource}`,
      parameters: [
        { type: "Path", name: "id", schema: idType.readonly() },
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      // @ts-expect-error
      response: fullSchema,
      // @ts-expect-error
      errors,
    },
    {
      method: "put",
      path: `/:id`,
      // @ts-expect-error
      alias: `update${capitalizedResource}`,
      description: `Set a specific ${resource}`,
      parameters: [
        { type: "Path", name: "id", schema: idType.readonly() },
        {
          name: "body",
          type: "Body",
          description: "The object to set",
          schema: fullSchema.partial() as z.Schema<z.input<Create>>,
        },
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      // @ts-expect-error
      response: shortSchema,
      // @ts-expect-error
      errors,
    },
    {
      method: "delete",
      path: `/:id`,
      // @ts-expect-error
      alias: `delete${capitalizedResource}`,
      description: `Delete a specific ${resource}`,
      parameters: [
        { type: "Path", name: "id", schema: idType.readonly() },
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      // @ts-expect-error
      response: shortSchema,
      // @ts-expect-error
      errors,
    },
  ]);
}
