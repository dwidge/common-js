// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useRef } from "react";
import { Page } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

export function PageCanvas({
  pageNumber,
  canvasRef,
  style,
  onRenderSuccess,
}: {
  pageNumber: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  style?: React.CSSProperties;
  onRenderSuccess?: (canvas: HTMLCanvasElement) => void;
}) {
  const inputRef = useRef<HTMLDivElement>(null);
  const myCanvasRef = useRef<HTMLCanvasElement>(null);

  const copyCanvas = async () => {
    const canvas = canvasRef.current;
    const myCanvas = myCanvasRef.current;

    if (!canvas) throw new Error("canvasRef undefined");
    if (!myCanvas) throw new Error("myCanvasRef undefined");

    canvas.width = myCanvas.width;
    canvas.height = myCanvas.height;

    const canvasContext = canvas.getContext("2d");
    canvasContext?.drawImage(myCanvas, 0, 0);

    if (onRenderSuccess) onRenderSuccess(canvas);
  };

  return (
    <>
      <div style={{ display: "none" }}>
        <Page
          pageNumber={pageNumber}
          canvasRef={myCanvasRef}
          inputRef={inputRef}
          onRenderSuccess={() => copyCanvas()}
        />
      </div>
      <canvas ref={canvasRef} style={style} />
    </>
  );
}
