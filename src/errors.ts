// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { makeErrors } from "@zodios/core";
import z from "zod";

const ErrorResponse = z.object({
  code: z.string(),
  message: z.string(),
  name: z.string(),
  status: z.number(),
  success: z.literal(false),
});

export const errors = makeErrors([
  {
    status: 401,
    description: "Unauthorized",
    schema: ErrorResponse.extend({
      status: z.literal(401),
    }),
  },
  {
    status: 404,
    description: "Not found",
    schema: ErrorResponse.extend({
      status: z.literal(404),
    }),
  },
  {
    status: 422,
    description: "Invalid body",
    schema: ErrorResponse.extend({
      status: z.literal(422),
    }),
  },
  {
    status: 500,
    description: "Internal error",
    schema: ErrorResponse.extend({
      status: z.literal(500),
    }),
  },
]);
