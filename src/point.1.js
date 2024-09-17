// Point 1.0
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { fill } from "./array";

/**
 * GenerateRandomPoint - generates a random point within the specified width and
 * height
 *
 * @param {array} [w, h] - An array containing the width and height to generate
 *   the point within
 * @returns {array} The generated point as an array in the form [x, y]
 */
export const generateRandomPoint = ([w = 100, h = 100] = []) => [
  Math.random() * w,
  Math.random() * h,
];

/**
 * GenerateRandomPoints - generates an array of random points within the
 * specified width and height
 *
 * @param {number} nodeCount - The number of points to generate
 * @param {array} [w, h] - An array containing the width and height to generate
 *   the points within
 * @returns {array} The generated points as an array of arrays in the form [[x1,
 *   y1], [x2, y2], ...]
 */
export const generateRandomPoints = (nodeCount, [w, h]) =>
  fill(nodeCount, (i) => generateRandomPoint([w, h]));

/**
 * ConvertClientCoordsToSvgCoords - converts client coordinates to SVG
 * coordinates
 *
 * @param {object} coords - An object containing the clientX and clientY
 *   coordinates
 * @param {object} svg - The SVG element to convert the coordinates for
 * @returns {object} An object containing the converted SVG coordinates in the
 *   form { x: x, y: y }
 */
export function convertClientCoordsToSvgCoords({ clientX, clientY }, svg) {
  const matrix = svg.getScreenCTM();
  const inverseMatrix = matrix.inverse();

  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const svgPoint = point.matrixTransform(inverseMatrix);

  return { x: svgPoint.x, y: svgPoint.y };
}
