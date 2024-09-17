// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ZodiosEndpointError, makeApi, makeEndpoint } from "@zodios/core";
import { z } from "zod";
import { capitalize } from "./capitalize.js";

export function makeBatchApi2<
  T extends string,
  FullSchema extends z.ZodObject<z.ZodRawShape>,
  MiniSchema extends z.ZodObject<z.ZodRawShape>,
  CreateSchema extends z.ZodObject<z.ZodRawShape>,
  UpdateSchema extends z.ZodObject<z.ZodRawShape>,
  Id extends z.ZodTypeAny,
  Err extends Array<ZodiosEndpointError>
>(
  resource: T,
  fullSchema: FullSchema,
  miniSchema: MiniSchema,
  createSchema: CreateSchema,
  updateSchema: UpdateSchema,
  idType: Id,
  errors: Err
) {
  const capitalizedResource = capitalize(resource);
  return makeApi([
    // {
    //   method: "get",
    //   path: `/`,
    //   // @ts-expect-error
    //   alias: `get${capitalizedResource}s`,
    //   description: `Search multiple ${resource}s`,
    //   parameters: [
    //     {
    //       name: "Authorization",
    //       type: "Header",
    //       schema: z.ostring(),
    //     },
    //   ],
    //   response: miniSchema.array(),
    //   // @ts-expect-error
    //   errors,
    // },
    {
      method: "post",
      path: `/`,
      // @ts-expect-error
      alias: `create${capitalizedResource}s`,
      description: `Create multiple ${resource}s`,
      parameters: [
        {
          name: "body",
          type: "Body",
          description: `The ${resource}s to set`,
          schema: createSchema.array(),
        },
        {
          name: "Authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: z.object({ id: idType }).array(),
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
          schema: updateSchema.array(),
        },
        {
          name: "Authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: z.object({ id: idType }).array(),
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
          schema: miniSchema.partial().array(),
        },
        {
          name: "Authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: z.object({ id: idType }).array(),
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
          name: "Authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: fullSchema.nullable(),
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
          schema: updateSchema.readonly(),
        },
        {
          name: "Authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: z.object({ id: idType }).nullable(),
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
          name: "Authorization",
          type: "Header",
          schema: z.ostring(),
        },
      ],
      response: z.object({ id: idType }).nullable(),
      // @ts-expect-error
      errors,
    },
  ]);
}

// export const makeGetQuery = <
//   T extends string,
//   MiniSchema extends z.ZodObject<z.ZodRawShape>,
//   Err extends Array<ZodiosEndpointError>
// >(
//   resource: T,
//   miniSchema: MiniSchema,
//   errors: Err
// ) =>
//   makeEndpoint({
//     method: "get",
//     path: `/`,
//     // @ts-expect-error
//     alias: `get${capitalizedResource}Query`,
//     description: `Get ${resource} query`,
//     parameters: [
//       // @ts-expect-error
//       ...zodToParameters("Query", miniSchema.partial()),
//       {
//         name: "Authorization",
//         type: "Header",
//         schema: z.ostring(),
//       },
//     ],
//     response: miniSchema.array(),
//     // @ts-expect-error
//     errors,
//   });

export const makeCreateList = <
  T extends string,
  CreateSchema extends z.ZodObject<z.ZodRawShape>,
  Id extends z.ZodTypeAny,
  Err extends Array<ZodiosEndpointError>
>(
  resource: T,
  createSchema: CreateSchema,
  idType: Id,
  errors: Err
) =>
  makeEndpoint({
    method: "post",
    path: `/`,
    // @ts-expect-error
    alias: `create${capitalize(resource)}List`,
    description: `Create ${resource} list`,
    parameters: [
      {
        name: "body",
        type: "Body",
        description: `The ${resource} list to create`,
        schema: createSchema.array(),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: z.object({ id: idType }).array(),
    // @ts-expect-error
    errors,
  });

export const makeUpdateList = <
  T extends string,
  UpdateSchema extends z.ZodObject<z.ZodRawShape>,
  Id extends z.ZodTypeAny,
  Err extends Array<ZodiosEndpointError>
>(
  resource: T,
  updateSchema: UpdateSchema,
  idType: Id,
  errors: Err
) =>
  makeEndpoint({
    method: "put",
    path: `/`,
    // @ts-expect-error
    alias: `update${capitalize(resource)}List`,
    description: `Update ${resource} list`,
    parameters: [
      {
        name: "body",
        type: "Body",
        description: `The ${resource} list to update`,
        schema: updateSchema.array(),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: z.object({ id: idType }).array(),
    // @ts-expect-error
    errors,
  });

export const makeDeleteList = <
  T extends string,
  MiniSchema extends z.ZodObject<z.ZodRawShape>,
  Id extends z.ZodTypeAny,
  Err extends Array<ZodiosEndpointError>
>(
  resource: T,
  miniSchema: MiniSchema,
  idType: Id,
  errors: Err
) =>
  makeEndpoint({
    method: "delete",
    path: `/`,
    // @ts-expect-error
    alias: `delete${capitalize(resource)}List`,
    description: `Delete ${resource} list`,
    parameters: [
      {
        name: "body",
        type: "Body",
        description: `The ${resource} query to delete`,
        schema: miniSchema.partial().array(),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: z.object({ id: idType }).array(),
    // @ts-expect-error
    errors,
  });

export const makeGetItem = <
  T extends string,
  FullSchema extends z.ZodObject<z.ZodRawShape>,
  Id extends z.ZodTypeAny,
  Err extends Array<ZodiosEndpointError>
>(
  resource: T,
  fullSchema: FullSchema,
  idType: Id,
  errors: Err
) =>
  makeEndpoint({
    method: "get",
    path: `/:id`,
    // @ts-expect-error
    alias: `get${capitalize(resource)}`,
    description: `Get a specific ${resource}`,
    parameters: [
      { type: "Path", name: "id", schema: idType.readonly() },
      {
        name: "Authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: fullSchema.nullable(),
    // @ts-expect-error
    errors,
  });

export const makeUpdateItem = <
  T extends string,
  UpdateSchema extends z.ZodObject<z.ZodRawShape>,
  Id extends z.ZodTypeAny,
  Err extends Array<ZodiosEndpointError>
>(
  resource: T,
  updateSchema: UpdateSchema,
  idType: Id,
  errors: Err
) =>
  makeEndpoint({
    method: "put",
    path: `/:id`,
    // @ts-expect-error
    alias: `update${capitalize(resource)}`,
    description: `Update a specific ${resource}`,
    parameters: [
      { type: "Path", name: "id", schema: idType.readonly() },
      {
        name: "body",
        type: "Body",
        description: "The object to set",
        schema: updateSchema.readonly(),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: z.object({ id: idType }).nullable(),
    // @ts-expect-error
    errors,
  });

export const makeDeleteItem = <
  T extends string,
  Id extends z.ZodTypeAny,
  Err extends Array<ZodiosEndpointError>
>(
  resource: T,
  idType: Id,
  errors: Err
) =>
  makeEndpoint({
    method: "delete",
    path: `/:id`,
    // @ts-expect-error
    alias: `delete${capitalize(resource)}`,
    description: `Delete a specific ${resource}`,
    parameters: [
      { type: "Path", name: "id", schema: idType.readonly() },
      {
        name: "Authorization",
        type: "Header",
        schema: z.ostring(),
      },
    ],
    response: z.object({ id: idType }).nullable(),
    // @ts-expect-error
    errors,
  });
