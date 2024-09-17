// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useEffect } from "react";
import { useState } from "react";
import { PageCanvas } from "./PageCanvas";
import { CanvasPart } from "./CanvasPart";

export function PageCanvasSplit({
  splitX,
  splitY,
  pageNumber,
  canvasRef,
  style,
  onRenderSuccess,
}: {
  splitX: number;
  splitY: number;
  pageNumber: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  style?: React.CSSProperties;
  onRenderSuccess?: (canvas: HTMLCanvasElement) => void;
}) {
  const [srcSize, setSrcSize] = useState<[number, number]>([0, 0]);
  const srcPos: (index: [number, number]) => [number, number] = (index) => [
    srcSize[0] * index[0],
    srcSize[1] * index[1],
  ];
  useEffect(() => {
    if (canvasRef.current) updateSize(canvasRef.current);
  }, [splitX, splitY, pageNumber, canvasRef.current]);

  const updateSize = (srcCanvas: HTMLCanvasElement) => {
    setSrcSize([
      (srcCanvas.width / splitX) | 0,
      (srcCanvas.height / splitY) | 0,
    ]);
  };

  return (
    <>
      <div style={{ display: "none" }}>
        <PageCanvas
          pageNumber={pageNumber}
          canvasRef={canvasRef}
          onRenderSuccess={(srcCanvas) => {
            updateSize(srcCanvas);
            if (onRenderSuccess) onRenderSuccess(srcCanvas);
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gap: "1em",
          gridTemplateColumns: `repeat(${splitX},1fr)`,
          gridTemplateRows: `repeat(${splitY},1fr)`,
        }}
      >
        {Array(splitX * splitY)
          .fill(0)
          .map((_v, i) => (
            <CanvasPart
              key={i}
              pos={srcPos([i % splitX, (i / splitX) | 0])}
              size={srcSize}
              srcRef={canvasRef}
              style={style}
            />
          ))}
      </div>
    </>
  );
}
