// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const logColor =
  (fg, bg) =>
  (title, ...body) =>
    console.log(
      "%c" + title,
      `background: ${bg}; color: ${fg}; padding: 3px; border-radius:3px`,
      body
    );
export const logBlue = logColor("skyblue", "#333");
export const logRed = logColor("orange", "#333");
