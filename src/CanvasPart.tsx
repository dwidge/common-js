// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useEffect, useRef } from "react";

export function CanvasPart({
  pos,
  size,
  srcRef,
  style,
  onRenderSuccess,
}: {
  pos: [number, number];
  size: [number, number];
  srcRef: React.RefObject<HTMLCanvasElement>;
  style?: React.CSSProperties;
  onRenderSuccess?: (canvas: HTMLCanvasElement) => void;
}) {
  const myCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (srcRef.current) copyCanvas(srcRef.current);
  }, [srcRef.current, pos, size]);

  const copyCanvas = async (srcCanvas: HTMLCanvasElement) => {
    const myCanvas = myCanvasRef.current;
    if (!myCanvas) throw new Error("myCanvasRef undefined");

    myCanvas.width = size[0];
    myCanvas.height = size[1];

    const canvasContext = myCanvas.getContext("2d");
    canvasContext?.drawImage(srcCanvas, ...pos, ...size, 0, 0, ...size);

    if (onRenderSuccess) onRenderSuccess(myCanvas);
  };

  return (
    <>
      <canvas ref={myCanvasRef} className="canvas-part" style={style} />
    </>
  );
}
