// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { InvalidBodyError } from "./Error.js";
import { z, ZodError } from "zod";

const zNumericString = z.string().regex(/^\d+$/).transform(Number);
const Id = z.number().int().nonnegative();

function zParse(schema, req) {
  try {
    return schema.parse(req);
  } catch (error) {
    const { data, params, query, headers } = req;
    console.log({ data, params, query, headers });
    zCatch(error);
  }
}

async function zParseAsync(schema, req) {
  try {
    return await schema.parseAsync(req);
  } catch (error) {
    zCatch(error);
  }
}

function zCatch(error) {
  if (error instanceof ZodError)
    throw new InvalidBodyError("parseE1", error.issues.map(convertIssue));

  throw error;
}

const convertIssue = ({ path, message }) => `${path.join(".")}: ${message}`;

export { z, Id, zNumericString, zParse, zParseAsync, convertIssue };
