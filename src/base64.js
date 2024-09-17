// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const asciiFromB64 = (s) => Buffer.from(s, "base64").toString("ascii");
export const b64FromAscii = (s) => Buffer.from(s).toString("base64");
