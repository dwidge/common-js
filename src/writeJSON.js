// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import fse from "fs-extra";
import { dirname } from "path";

export async function writeJSON(data, filepath) {
  let s = JSON.stringify(data, null, 2);
  await fse.ensureDir(dirname(filepath));
  await fse.writeFile(filepath, s, { encoding: "utf8", flag: "w" });
}
