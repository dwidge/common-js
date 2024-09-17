// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { parseSafeJson } from "example-item/utils/parseSafeJson";
import z from "zod";

export const UrlMap = z.array(z.tuple([z.string(), z.string()]));
export type UrlMap = Map<string, string>;

export const getUrlMapOfString = (s: string): UrlMap =>
  new Map(UrlMap.parse(parseSafeJson(s)));
