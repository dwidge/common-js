// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { z } from "zod";
import { Id } from "./Id.js";
import { Base32BigInt, BigIntBase32, UnixTimestamp } from "@dwidge/randid";

export const File2 = z.object({
  id: BigIntBase32,
  created: z.coerce.boolean(),
  createdAt: UnixTimestamp,
  createdBy: Id.nullable(),
  companyId: Id.nullable(),

  key: z.string().min(1).max(255).nullable(),
  size: z.coerce.number().int().min(0).nullable(),
  mime: z.string().min(1).max(255).nullable(),
  sha256: z.string().length(64).nullable(),
});
export type File2 = z.infer<typeof File2>;

export const File2Db = File2.extend({ id: Base32BigInt });
export type File2Db = z.infer<typeof File2Db>;

export const File2DbCreate = File2Db.partial().required({
  id: true,
  createdAt: true,
});
export type File2DbCreate = z.infer<typeof File2DbCreate>;

export const File2Get = File2.extend({
  getUrl: z.string().min(1).url().nullable(),
  putUrl: z.string().min(1).url().nullable(),
}).partial();
export type File2Get = z.infer<typeof File2Get>;

export const File2Set = File2.omit({
  createdAt: true,
  createdBy: true,
  key: true,
}).partial();
export type File2Set = z.infer<typeof File2Set>;

export const File2Key = File2.pick({ id: true });
export type File2Key = z.infer<typeof File2Key>;

export const File2Filter = File2.extend({
  getUrl: z.string().length(0),
  putUrl: z.string().length(0),
}).partial();
export type File2Filter = z.infer<typeof File2Filter>;
