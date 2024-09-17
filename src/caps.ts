// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

//stackoverflow.com/a/38530325
export const titleCase = (str) => str.replace(/\b\w/g, (l) => l.toUpperCase());

export const caps = (str) => titleCase(str).replace(/[^A-Z\d]+/g, "");
