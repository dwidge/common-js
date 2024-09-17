// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

//dev.to/zirkelc/read-all-files-of-directory-and-subdirectories-with-recursive-generators-in-javascript-2pbd

import { readdirSync, promises } from "fs";
import { join } from "path";

export function* readAllFiles(dir) {
  const files = readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(join(dir, file.name));
    } else {
      yield join(dir, file.name);
    }
  }
}

export async function readAllFilesAsync(dir) {
  const files = await promises.readdir(dir, { withFileTypes: true });
  console.log(dir, files);

  const filePromises = files.map(async (file) => {
    if (file.isDirectory()) {
      return (await readAllFilesAsync(dir + "/" + file.name)).map(
        (f) => file.name + "/" + f
      );
    } else {
      return file.name;
    }
  });

  const fileList = await Promise.all(filePromises);
  return fileList.flat();
}
