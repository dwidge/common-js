// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { useState } from "react";
import { Vertical } from "@dwidge/react-lib/Flex";
import { PageControls } from "./PageControls";

import { pdfjs, Document } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function PdfChooser({
  numPages: [numPages, setNumPages],
  pageNumber: [pageNumber, setPageNumber],
  children,
}: React.PropsWithChildren<{
  numPages: [number, (v: number) => void];
  pageNumber: [number, (v: number) => void];
}>) {
  const [selectedFile, setSelectedFile] = useState<File>();

  return (
    <Vertical>
      <input
        type="file"
        accept="application/pdf"
        onChange={(event) => {
          const file = event.target.files?.[0];
          setSelectedFile(file);
        }}
      />
      {numPages ? (
        <PageControls
          pageNumber={[pageNumber, setPageNumber]}
          numPages={numPages}
        />
      ) : null}
      {selectedFile ? (
        <Document
          file={selectedFile}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
          }}
        >
          {children}
        </Document>
      ) : null}
      {numPages ? (
        <PageControls
          pageNumber={[pageNumber, setPageNumber]}
          numPages={numPages}
        />
      ) : null}
    </Vertical>
  );
}
