// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { test } from "node:test";
import { withAuthFetch } from "../lib/fixture/withAuthFetch.js";
import { testFile2Api } from "../lib/fixture/testFile2Api.js";

test("File2Api", () => withAuthFetch().then(testFile2Api));
