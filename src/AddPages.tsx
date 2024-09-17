// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useRef, useState } from "react";
import { Item } from "./types";
import { Vertical } from "@dwidge/react-lib/Flex";
import { Button } from "@mui/material";
import { PdfChooser } from "./pdf/PdfChooser";
import { PageCanvasSplit } from "./pdf/PageCanvasSplit";
import { SplitControls } from "./pdf/SplitControls";
import { TextField } from "@dwidge/form-fields/TextField";
import getBlobOfCanvas from "./pdf/getBlobOfCanvas";
import makeId from "../../utils/makeId";
import { Item } from "example-item/types/Item";

export function AddPages({
  value,
  onChange,
}: {
  value: Item;
  onChange: (v: Item) => void;
}) {
  const [numPages, setNumPages] = useState(0);
  const [firstPage, setFirstPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [splitX, setSplitX] = useState<number>(1);
  const [splitY, setSplitY] = useState<number>(1);
  const [nameStart, setNameStart] = useState<number>(1);
  const [namePrefix, setNamePrefix] = useState("Page ");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);

  const extract = async () => {
    const parts: HTMLCanvasElement[] = Array.prototype.slice.call(
      pagesRef.current?.getElementsByClassName("canvas-part") ?? []
    );
    const blobs = parts.map((c) =>
      getBlobOfCanvas(c).then((blob) => blob ?? new Blob())
    );
    const items: Item[] = blobs.map((image, i) => ({
      id: makeId(),
      title: namePrefix + (nameStart + i),
      order: i,
      type: "IMAGE",
      show: true,
      data: "",
      ParentId: "",
      ItemId: value.id,
      dirty: true,
      blobs: new Map([["image", image]]),
    }));
    const Items: Item[] = value.Items;
    onChange({ ...value, Items: Items.concat(...items) });
  };

  return (
    <Vertical style={{ gap: "1em" }}>
      <h2>Add pages from PDF</h2>
      <PdfChooser
        pageNumber={[firstPage, setFirstPage]}
        numPages={[numPages, setNumPages]}
      >
        <Vertical ref={pagesRef} style={{ gap: "1em" }}>
          {Array(Math.max(0, pageCount))
            .fill(0)
            .map((_v, i) => (
              <PageCanvasSplit
                key={pageCount * 1e6 + firstPage * 1e4 + i}
                splitX={splitX}
                splitY={splitY}
                pageNumber={firstPage + i}
                canvasRef={canvasRef}
                style={{ width: "100%", border: "solid 2px red" }}
              />
            ))}
        </Vertical>
      </PdfChooser>
      <SplitControls
        {...{
          numPages,
          splitX: [splitX, setSplitX],
          splitY: [splitY, setSplitY],
          pageCount: [pageCount, setPageCount],
        }}
      />
      <TextField
        label="Name prefix"
        value={namePrefix}
        onChange={setNamePrefix}
      />
      <TextField
        label="Name start"
        value={nameStart.toString()}
        onChange={(v: string) => setNameStart(parseInt(v))}
      />
      <Button onClick={extract}>Add</Button>
    </Vertical>
  );
}
