// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import z from "zod";

/**
 * Converts Zod types into optional values. Null becomes undefined.
 *
 * @param {T} t - The Zod type to convert to an optional type.
 * @template T
 * @returns {T | undefined} The optional version of the provided Zod type.
 */
const toOptional = <T>(t: T) => (t != null ? t : undefined);

export const optional = <T extends z.ZodTypeAny>(t: T) =>
  t.nullish().transform(toOptional);

/**
 * Create an optional Zod type for strings. Null becomes undefined.
 *
 * @returns {z.ZodTypeAny} An optional Zod string type.
 */
export const ostring = () => optional(z.coerce.string());

/**
 * Create an optional Zod type for numbers. Null becomes undefined.
 *
 * @returns {z.ZodTypeAny} An optional Zod number type.
 */
export const onumber = () => optional(z.coerce.number());

/**
 * Create an optional Zod type for dates. Null becomes undefined.
 *
 * @returns {z.ZodTypeAny} An optional Zod date type.
 */
export const odate = () => optional(z.coerce.date());

/**
 * Create an optional Zod type for booleans. Null becomes undefined.
 *
 * @returns {z.ZodTypeAny} An optional Zod boolean type.
 */
export const oboolean = () => optional(z.coerce.boolean());
