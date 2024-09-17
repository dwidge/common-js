// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// ChatGPT

import z from "zod";

// Convert zod nullable types to optional types
export function convertNullableToOptional<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T
): T {
  const newShape: any = {};

  for (const key in schema.shape) {
    const field = schema.shape[key];

    if (field instanceof z.ZodNullable) {
      newShape[key] = field.unwrap();
      if (!(newShape[key] instanceof z.ZodArray))
        newShape[key] = newShape[key].optional();
      // .transform((x: any) => x ?? null);
    } else if (
      field instanceof z.ZodOptional &&
      field.unwrap() instanceof z.ZodNullable
    ) {
      newShape[key] = field.unwrap().unwrap();
      if (!(newShape[key] instanceof z.ZodArray))
        newShape[key] = newShape[key].optional();
      // .transform((x: any) => x ?? null);
    } else if (
      field instanceof z.ZodOptional &&
      field.unwrap() instanceof z.ZodArray
    ) {
      newShape[key] = convertNullableToOptional(field.unwrap().element).array();
    } else if (field instanceof z.ZodArray) {
      newShape[key] = convertNullableToOptional(field.element).array();
    } else if (field instanceof z.ZodObject) {
      newShape[key] = convertNullableToOptional(field);
    } else {
      newShape[key] = field;
    }
  }

  return z.object(newShape) as T;
}
