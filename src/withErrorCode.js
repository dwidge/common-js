// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const withErrorCode =
  (code, log = false) =>
  (e) => {
    if (log) console.log(code, e);
    const ee = new Error(
      code + ": " + (e.errors?.map((e) => e.message) ?? e.message)
    );
    // ee.stack = e.stack;
    throw ee;
  };
exports.withErrorCode = withErrorCode;
