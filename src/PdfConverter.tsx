// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { useState } from "react";

export function PdfConverter({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) {
  const [pageBlob, setPageBlob] = useState<Blob>();

  const convertPageToBlob = async (): Promise<Blob | null> => {
    const canvas = document.createElement("canvas");
    const pdfPage = canvasRef.current;
    //document.getElementsByClassName("react-pdf__Page")[0];
    if (!pdfPage) throw new Error("canvasRef undefined");

    canvas.width = pdfPage.width;
    canvas.height = pdfPage.height;

    const canvasContext = canvas.getContext("2d");
    canvasContext?.drawImage(pdfPage, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  };

  const handleConvertPage = async () => {
    const blob = await convertPageToBlob();
    setPageBlob(blob ?? undefined);
  };

  return (
    <div>
      <button onClick={handleConvertPage}>Convert to PNG</button>
      {pageBlob && (
        <div>
          <h2>Converted Page:</h2>
          <img
            style={{ flex: "auto", width: "100%" }}
            src={URL.createObjectURL(pageBlob)}
            alt="Converted Page"
          />
        </div>
      )}
    </div>
  );
}
