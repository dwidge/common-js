// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const stringSvgPoints = (
  points: [x: number, y: number][],
  close: boolean
) =>
  points.map(([x, y], i) => (i ? "L" : "M") + x + " " + y).join(" ") +
  (close ? "Z" : "");
