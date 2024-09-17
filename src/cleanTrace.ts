// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const cleanTrace = (stack: string) =>
  makePathRelative(stripStack(stack));

const stripStack = (stack: string) =>
  stack
    .replace(/.*(?:node_modules|node:internal).*/g, "")
    .replace(/\n+/g, "\n");

import * as path from "path";

function makePathRelative(inputString: string): string {
  const cwd = process.cwd();
  const pathRegex = /file:\/\/\/([A-Za-z]:[\\/][^:\s)]+)/g;

  inputString = inputString.replaceAll(cwd, "").replaceAll("////", "//");
  const relativeString = inputString.replace(pathRegex, (match, filePath) => {
    if (path.isAbsolute(filePath)) {
      const relativePath = path.relative(cwd, filePath).replace(/\\/g, "/");
      return `file://${relativePath}`;
    }
    return match;
  });

  return relativeString;
}
