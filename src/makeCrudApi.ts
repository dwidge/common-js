// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// MIT License

// Copyright (c) 2022 ecyrbe

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { ZodiosEndpointError, makeApi } from "@zodios/core";
import { z } from "zod";
import { capitalize } from "./capitalize.js";

/**
 * Helper to generate a basic CRUD api for a given resource
 * @param resource - the resource to generate the api for
 * @param schema - the schema of the resource
 * @returns - the api definitions
 */
export function makeCrudApi<
  T extends string,
  S extends z.ZodObject<z.ZodRawShape>,
  Index extends z.ZodObject<z.ZodRawShape>,
  Create extends z.ZodObject<z.ZodRawShape>,
  Id extends z.ZodTypeAny,
  Err extends Array<ZodiosEndpointError>
>(
  resource: T,
  schema: S,
  indexSchema: Index,
  createSchema: Create,
  idType: Id,
  errors: Err
) {
  type Schema = z.input<S>;
  const capitalizedResource = capitalize(resource);
  return makeApi([
    {
      method: "get",
      path: `/`,
      // @ts-expect-error
      alias: `get${capitalizedResource}s`,
      description: `Get all ${resource}s`,
      parameters: [
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: z.array(indexSchema),
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
      response: schema.nullable(),
      // @ts-expect-error
      errors,
    },
    {
      method: "post",
      path: `/`,
      // @ts-expect-error
      alias: `create${capitalizedResource}`,
      description: `Create a new ${resource}`,
      parameters: [
        {
          name: "body",
          type: "Body",
          description: "The object to create",
          schema: createSchema as z.Schema<z.input<Create>>,
        },
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: schema.pick({ id: true }).nullable(),
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
          schema: schema.partial() as z.Schema<z.input<Create>>,
        },
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: schema.pick({ id: true }).nullable(),
      // @ts-expect-error
      errors,
    },
    {
      method: "patch",
      path: `/:id`,
      // @ts-expect-error
      alias: `patch${capitalizedResource}`,
      description: `Patch a ${resource}`,
      parameters: [
        { type: "Path", name: "id", schema: idType.readonly() },
        {
          name: "body",
          type: "Body",
          description: "The object to patch",
          schema: schema.partial() as z.Schema<Partial<Schema>>,
        },
        {
          name: "authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: schema.pick({ id: true }).nullable(),
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
      response: schema.pick({ id: true }).nullable(),
      // @ts-expect-error
      errors,
    },
  ]);
}
