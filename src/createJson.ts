// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import z from "zod";
import { generate, omitSorry, extractJsonArray } from "../utils/openai.js";

export async function createAiJson({
  about,
  context,
  schema,
  count,
  uid,
}: {
  about: string;
  context?: string;
  schema: string;
  count: number;
  uid: string;
}) {
  const prompt = `${context}\n\nRespond json no whitespace. Make ${count} about '${about}':\nJSON.stringify([...generate(${count},${schema})])`;
  const completion = await generate(uid, prompt, 500);
  return extractJsonArray(omitSorry(completion));
}

// provide defaults on 1st level props in your zod schema, else skipped by ai

export async function createAiSchema<Schema extends z.AnyZodObject>({
  about,
  context,
  schema,
  count,
  uid,
}: {
  about: string;
  context?: string;
  schema: Schema;
  count: number;
  uid: string;
}) {
  return z.array(schema).parse(
    await createAiJson({
      about,
      context,
      schema: JSON.stringify(getDefaults(schema)),
      count,
      uid,
    })
  );
}

function getDefaults<Schema extends z.AnyZodObject>(schema: Schema) {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault)
        return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
}
