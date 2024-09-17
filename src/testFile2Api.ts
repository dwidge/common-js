// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { expect } from "expect";
import { assert } from "@dwidge/query";
import { AuthFetch } from "./withAuthFetch.js";
import { makeFile2, withTmpFile2 } from "./withTmpFile2.js";
import { useFile2Api } from "../fetch/file2.js";
import { File2Set, File2Key } from "@dwidge/types";
import { Fetch } from "@dwidge/query";
import { createHash } from "crypto";
import axios from "axios";

const testData = "12345";

export async function testFile2Api({ auth, fetch }: AuthFetch) {
  assert(auth.companyId);
  await withTmpFile2(
    { auth, fetch },
    [
      makeFile2({
        size: testData.length,
      }),
    ],
    ([file1]) => testFile2(fetch, [file1!])
  );
  await withTmpFile2(
    { auth, fetch },
    [
      makeFile2({
        size: testData.length,
      }),
    ],
    ([file1]) => testFile2List(fetch, [file1!])
  );
  await withTmpFile2(
    { auth, fetch },
    [
      makeFile2({
        size: testData.length,
      }),
    ],
    ([file1]) => testFile2Upload(fetch, [file1!])
  );
}

const testFile2 = async (
  fetch: Fetch,
  [file1]: ((File2Set & File2Key) | null)[]
) => {
  assert(file1);
  const file2Api = useFile2Api(fetch);
  const { id, created } = file1;

  await expect(file2Api.getFile2({ id })).resolves.toStrictEqual({
    id: file1.id,
  });

  await expect(
    file2Api.updateFile2({
      id,
      created: !created,
    })
  ).resolves.toStrictEqual({
    id,
  });
  await expect(
    file2Api.getFile2({ id, created: undefined })
  ).resolves.toStrictEqual({
    id,
    created: !created,
  });

  await expect(file2Api.deleteFile2({ id })).resolves.toStrictEqual({
    id,
  });
  await expect(file2Api.getFile2({ id })).resolves.toStrictEqual(null);
  await expect(file2Api.deleteFile2({ id })).resolves.toStrictEqual({ id });
};

const testFile2List = async (
  fetch: Fetch,
  [file1]: ((File2Set & File2Key) | null)[]
) => {
  assert(file1);
  const file2Api = useFile2Api(fetch);
  const { id, created } = file1;

  await expect(file2Api.getFile2List({ id })).resolves.toStrictEqual([
    {
      id: file1.id,
    },
  ]);

  await expect(
    file2Api.updateFile2List([
      {
        id,
        created: !created,
      },
    ])
  ).resolves.toStrictEqual([
    {
      id,
    },
  ]);
  await expect(
    file2Api.getFile2List({ id, created: undefined })
  ).resolves.toStrictEqual([
    {
      id,
      created: !created,
    },
  ]);

  await expect(file2Api.deleteFile2List([{ id }])).resolves.toStrictEqual([
    {
      id,
    },
  ]);
  await expect(file2Api.getFile2List({ id })).resolves.toStrictEqual([]);
  await expect(file2Api.deleteFile2List([{ id }])).resolves.toStrictEqual([
    { id },
  ]);
};

const testFile2Upload = async (
  fetch: Fetch,
  [file1]: ((File2Set & File2Key) | null)[]
) => {
  assert(file1);
  const file2Api = useFile2Api(fetch);
  const { id } = file1;

  await expect(file2Api.getFile2({ id })).resolves.toStrictEqual({
    id: file1.id,
  });

  const original = Buffer.from("abc");
  const wrongSize = Buffer.from("abcd");
  const wrongData = Buffer.from("abd");
  const sha256 = createHash("sha256").update(original).digest("hex");

  await expect(
    file2Api.updateFile2({
      id,
      size: original.length,
      sha256,
      mime: "text/plain",
    })
  ).resolves.toStrictEqual({
    id,
  });
  const file1b = await file2Api.getFile2({
    id,
    putUrl: undefined,
    getUrl: undefined,
  });
  assert(file1b);
  const { putUrl } = file1b;
  assert(putUrl);
  expect(putUrl).toMatch("//");
  const { getUrl } = file1b;
  assert(getUrl);
  expect(getUrl).toMatch("//");

  await expect(axios.put(putUrl, wrongSize)).rejects.toThrow();
  if (0) await expect(axios.put(putUrl, wrongData)).rejects.toThrow();
  await expect(axios.put(putUrl, original)).resolves.toMatchObject({
    status: 200,
  });
  const stored = await axios.get(getUrl);
  expect(original.equals(Buffer.from(stored.data))).toBeTruthy();
};
