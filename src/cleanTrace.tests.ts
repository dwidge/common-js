// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { expect } from "expect";
import { cleanTrace } from "./cleanTrace.js";

export async function testCleanTrace() {
  const cwd = process.cwd();
  expect(
    cleanTrace(`Error
  at new GenericError (file:///${cwd}/lib/error/GenericError.ts:16:42)
  at new EmailNotFoundError (file:///${cwd}/src/utils/Error.js:81:5)
  at getUserByEmail (file:///${cwd}/src/utils/User.js:36:20)
  at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
  at async login (file:///${cwd}/src/controllers/Login.ts:7:15)
  `)
  ).toBe(`Error
  at new GenericError (file://lib/error/GenericError.ts:16:42)
  at new EmailNotFoundError (file://src/utils/Error.js:81:5)
  at getUserByEmail (file://src/utils/User.js:36:20)
  at async login (file://src/controllers/Login.ts:7:15)
  `);
}
