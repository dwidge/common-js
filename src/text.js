// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const hasNumberPoint = (s) => /^\d+\. /.test(s);
export const omitNumberPoint = (s) => s.replace(/^\d+\. /, "");
export const omitTrailingPoint = (s) => s.replace(/\.+$/, "");
export const notEmpty = (s) => !!s;
