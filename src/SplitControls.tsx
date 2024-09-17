// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Vertical, Horizontal } from "@dwidge/react-lib/Flex";
import { TextField } from "@dwidge/form-fields/TextField";

export function SplitControls({
  numPages,
  splitX: [splitX, setSplitX],
  splitY: [splitY, setSplitY],
  pageCount: [pageCount, setPageCount],
}: // firstPage: [firstPage, setFirstPage],
// endPage: [endPage, setEndPage],
{
  numPages: number;
  splitX: [number, (v: number) => void];
  splitY: [number, (v: number) => void];
  pageCount: [number, (v: number) => void];
  // firstPage: [number, (v: number) => void];
  // endPage: [number, (v: number) => void];
}) {
  return (
    <Vertical style={{ gap: "1em" }}>
      <Horizontal>
        <TextField
          label="Split Horizontal"
          value={splitX.toString()}
          onChange={(x: string) => setSplitX(+x)}
        />
        <TextField
          label="Split Vertical"
          value={splitY.toString()}
          onChange={(v: string) => setSplitY(+v)}
        />
        <TextField
          label="Pages"
          value={pageCount.toString()}
          onChange={(x: string) => setPageCount(+x)}
        />
      </Horizontal>
      Pages: {pageCount * splitX * splitY}
      {/* <Horizontal>
        <TextField
          label="First"
          value={firstPage.toString()}
          onChange={(x: string) => setFirstPage(+x)}
        />
        <TextField
          label="End"
          value={endPage.toString()}
          onChange={(x: string) => setEndPage(+x)}
        />
      </Horizontal> */}
    </Vertical>
  );
}
