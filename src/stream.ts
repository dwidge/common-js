// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { promises, createReadStream, createWriteStream, ReadStream } from "fs";
import { NotFoundError } from "./Error.js";
import { readAllFilesAsync } from "./readAllFiles.js";

export async function mkdir(
  path: string,
  opts?: {
    recursive: boolean;
  }
) {
  return await promises.mkdir(path, opts).catch((e) => {
    if (e.code === "EEXIST") return path;
    // console.log(e);
    throw new NotFoundError("mkdirE1", path);
  });
}

export async function rmdir(path: string) {
  return await promises
    .rm(path, {
      recursive: true,
    })
    .catch((e) => {
      throw new NotFoundError("rkdirE1", path);
    });
}

export async function rmfile(path: string) {
  return await promises.unlink(path).catch((e) => {
    console.log(e);
    throw new NotFoundError("rmfileE1", path);
  });
}

export async function getList(
  path: string,
  opts?: {
    recursive: boolean;
  }
): Promise<string[]> {
  if (opts?.recursive)
    return readAllFilesAsync(path).catch((e: unknown) => {
      console.log(e);
      throw new NotFoundError("loadListE1", path);
    });
  else
    return await promises.readdir(path).catch((e) => {
      console.log(e);
      throw new NotFoundError("loadListE1", path);
    });
}

export async function readStream(
  path: string,
  opts?: any
): Promise<ReadStream> {
  return new Promise<ReadStream>((resolve, reject) => {
    const readStream = createReadStream(path, opts);
    readStream.on("open", () => resolve(readStream)).on("error", reject);
  }).catch((e) => {
    console.log(e);
    throw new NotFoundError("readStreamE1", path);
  });
}

export async function writeStream(
  fileStream: ReadStream,
  path: string,
  opts?: any
) {
  return new Promise<void>((resolve, reject) => {
    const writeStream = createWriteStream(path, opts);
    fileStream
      .pipe(writeStream)
      .on("finish", () => resolve())
      .on("error", reject);
  }).catch((e) => {
    console.log(e);
    throw new NotFoundError("writeStreamE1", path);
  });
}
