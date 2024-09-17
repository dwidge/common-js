// svg 1.0
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const svgPosFromClientPos = (node, { clientX, clientY }) => {
  const svg = svgParent(node);
  const p = svg.createSVGPoint();
  p.x = clientX;
  p.y = clientY;
  return p.matrixTransform(node.parentNode.getScreenCTM().inverse());
};

export const svgParent = (node) => {
  while (node && node.tagName !== "svg") node = node.parentNode;
  return node;
};

export const svgPathFromPoints = (points, close) =>
  "M" + points.map(([x, y]) => x + " " + y).join(" L") + (close ? " Z" : "");

export const inBox = ([bx, by], [bw, bh], { x, y }) =>
  bx <= x && x < bx + bw && by <= y && y < by + bh;
