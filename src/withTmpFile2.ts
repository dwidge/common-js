// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { File2Set, File2Key } from "@dwidge/types";
import { assert } from "@dwidge/query";
import { AuthFetch } from "./withAuthFetch.js";
import { useFile2Api } from "../fetch/file2.js";

export const withTmpFile2 = async <T>(
  { auth, fetch }: AuthFetch,
  list: File2Set[],
  f: (comment: (null | (File2Set & File2Key))[]) => Promise<T>
) => {
  assert(auth.companyId);
  const commentApi = useFile2Api(fetch);

  const ids = await commentApi.createFile2List(list);
  const created = ids.map((v, i) => v && { ...list[i], ...v });

  try {
    return await f(created);
  } finally {
    await commentApi.deleteFile2List(ids.filter((v): v is File2Key => !!v));
  }
};

export const makeFile2 = (item: File2Set) =>
  ({
    ...item,
  } satisfies File2Set);
