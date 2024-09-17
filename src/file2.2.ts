// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { File2Filter, File2Key, File2Get, File2Set } from "@dwidge/types";
import { useFilterQuery } from "@dwidge/query";
import { Fetch } from "@dwidge/query";

export type File2Api = {
  getFile2List: (filter?: File2Filter) => Promise<File2Get[]>;
  createFile2List: (list: File2Set[]) => Promise<(File2Key | null)[]>;
  updateFile2List: (list: File2Set[]) => Promise<(File2Key | null)[]>;
  deleteFile2List: (list: File2Key[]) => Promise<(File2Key | null)[]>;
  getFile2: (item: File2Filter & File2Key) => Promise<File2Get | null>;
  updateFile2: (item: File2Set) => Promise<File2Key | null>;
  deleteFile2: (item: File2Key) => Promise<File2Key | null>;
};
const routePath = "v2/file2";

export const useFile2Api = (fetch: Fetch): File2Api => ({
  getFile2List: (filter?: File2Filter) =>
    fetch(
      "get",
      routePath + "?" + useFilterQuery(File2Filter.optional().parse(filter))
    ).then((v) => File2Get.array().parse(v)),
  createFile2List: (list: File2Set[]) =>
    fetch("put", routePath, File2Set.nullable().array().parse(list)).then((v) =>
      File2Key.array().parse(v)
    ),
  updateFile2List: (list: File2Set[]) =>
    fetch("put", routePath, File2Set.nullable().array().parse(list)).then((v) =>
      File2Key.array().parse(v)
    ),
  deleteFile2List: (list: File2Key[]) =>
    fetch(
      "put",
      routePath,
      File2Key.array()
        .parse(list)
        .map((v) => ({ ...v, created: false }))
    ).then((v) => File2Key.nullable().array().parse(v)),
  getFile2: (item: File2Filter & File2Key) =>
    fetch(
      "get",
      routePath + "?" + useFilterQuery(File2Filter.parse(item))
    ).then((v) => File2Get.array().parse(v)[0] ?? null),
  updateFile2: (item: File2Set) =>
    fetch("put", routePath, [File2Set.parse(item)]).then(
      (v) => File2Key.nullable().array().parse(v)[0] ?? null
    ),
  deleteFile2: (item: File2Key) =>
    fetch(
      "put",
      routePath,
      File2Key.array()
        .parse([item])
        .map((v) => ({ ...v, created: false }))
    ).then((v) => File2Key.nullable().array().parse(v)[0] ?? null),
});
