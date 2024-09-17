// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { saveAs } from "file-saver";
import { saveSvgAsPng } from "save-svg-as-png";
import exportFromJSON from "export-from-json";

export function saveSVG(svg, name) {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  saveAs(new Blob([svgString], { type: "image/svg+xml" }), name);
}

export function saveJSON(data, fileName) {
  exportFromJSON({
    data,
    fileName,
    exportType: exportFromJSON.types.json,
  });
}

export function savePNG(svg, fileName) {
  saveSvgAsPng(svg, fileName);
}
