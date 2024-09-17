// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Vertical, Horizontal } from "@dwidge/react-lib/Flex";
import { Button } from "@mui/material";

export function PageControls({
  numPages,
  pageNumber: [pageNumber, setPageNumber],
}: {
  numPages: number;
  pageNumber: [number, (v: number) => void];
}) {
  return (
    <Vertical>
      <Horizontal>
        <Button onClick={() => setPageNumber(pageNumber - 1)}>Prev</Button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <Button onClick={() => setPageNumber(pageNumber + 1)}>Next</Button>
      </Horizontal>
      <input
        type="range"
        max={numPages}
        min={1}
        value={pageNumber}
        onChange={(e) => setPageNumber(+e.target.value)}
      />
    </Vertical>
  );
}
