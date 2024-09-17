// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import mime from "mime.json";

export const getExtOfMimeType = (mimeType: string) =>
  Object.entries(mime).find(([_ext, mime]) => mime === mimeType)?.[0];

export const getFileOfBlob = (blob: Blob, name: string = "file") => {
  const fileName = `${name}.${getExtOfMimeType(blob.type) ?? "bin"}`;
  return new File([blob], fileName);
};

export const getFileMapOfBlobMap = (blobs: BlobMap): FileMap =>
  new Map(
    [...blobs.entries()].map(([key, blob]): [string, Promise<File>] => [
      key,
      blob.then((blob) => getFileOfBlob(blob, key)),
    ])
  );

export const awaitMap = <T,>(
  map: Map<string, Promise<T>>
): Promise<Map<string, T>> =>
  Promise.all(
    [...map.entries()].map(([key, val]) =>
      val.then((val): [string, T] => [key, val])
    )
  ).then((entries) => new Map(entries));

export const getObjectOfMap = <T,>(map: Map<string, T>): { [key: string]: T } =>
  Object.fromEntries(map.entries());

export type BlobMap = Map<string, Promise<Blob>>;

export type FileMap = Map<string, Promise<File>>;
