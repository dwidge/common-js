// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt
// Modified from original:
// https://github.com/ecyrbe/zodios/discussions/414

import { z } from "zod";

export type UnionToIntersection<union> = (
  union extends any ? (k: union) => void : never
) extends (k: infer intersection) => void
  ? intersection
  : never;
/**
 * get last element of union
 * @param Union - Union of any types
 * @returns Last element of union
 */
type GetUnionLast<Union> = UnionToIntersection<
  Union extends any ? () => Union : never
> extends () => infer Last
  ? Last
  : never;

/**
 * Convert union to tuple
 * @param Union - Union of any types, can be union of complex, composed or primitive types
 * @returns Tuple of each elements in the union
 */
export type UnionToTuple<Union, Tuple extends unknown[] = []> = [
  Union
] extends [never]
  ? Tuple
  : UnionToTuple<
      Exclude<Union, GetUnionLast<Union>>,
      [GetUnionLast<Union>, ...Tuple]
    >;

export type ZodToQueryParameters<
  Type extends "Query" | "Path" | "Header",
  T extends z.ZodObject<z.ZodRawShape>,
  Keys extends [...string[]] = Extract<
    UnionToTuple<keyof T["_input"]>,
    [...string[]]
  >
> = {
  [Index in keyof Keys]: {
    name: Keys[Index];
    type: Type;
    description?: string;
    schema: T["shape"][Keys[Index]];
  };
};

export const zodToParameters = <
  T extends z.ZodObject<z.ZodRawShape>,
  Type extends "Query" | "Path" | "Header"
>(
  type: Type,
  t: T
): ZodToQueryParameters<Type, T> => {
  const parameters = Object.keys(t.shape).map((key) => ({
    name: key,
    type,
    description: t.shape[key].description,
    schema: t.shape[key],
  }));
  return parameters as any;
};
