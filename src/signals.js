// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// https://github.com/TypeStrong/ts-node/issues/2026#issuecomment-1625385054

import { setUncaughtExceptionCaptureCallback } from "node:process";

setUncaughtExceptionCaptureCallback((err) => {
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

process.once("SIGINT", function (code) {
  console.log("SIGINT received...");
  process.exit();
});

process.once("SIGTERM", function (code) {
  console.log("SIGTERM received...");
  process.exit();
});
