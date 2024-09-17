// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { Fragment, useEffect, useRef, useState } from "react";
import { produce } from "immer";

type LineSegment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export function WordMatch({
  headers,
  columns,
  matches: [matches, setMatches],
}: {
  headers: string[];
  columns: string[][];
  matches: [string[][], (v: string[][]) => void | undefined];
}) {
  if (headers.length !== columns.length) throw new Error("WordMatchE1");
  if (!matches.every((m) => m.length === columns.length)) {
    console.log(
      "WordMatchE2",
      columns.length,
      matches.filter((m) => m.length !== columns.length)
    );
    throw new Error("WordMatchE2");
  }

  const ref = useRef<HTMLDivElement>(null);
  const [lineCoordinates, setLineCoordinates] = useState<
    (LineSegment | undefined)[][]
  >([]);

  const calculateLineCoordinates = () => {
    setLineCoordinates(
      matches.map((matchingWords) => {
        const lineSegments: (LineSegment | undefined)[] = [];
        for (let i = 0; i < matchingWords.length - 1; i++) {
          lineSegments.push(makeLine(i, matchingWords));
        }
        return lineSegments;
      })
    );
  };

  function makeLine(
    i: number,
    matchingWords: string[]
  ): LineSegment | undefined {
    const rowIndex1 = columns[i].indexOf(matchingWords[i]);
    const rowIndex2 = columns[i + 1].indexOf(matchingWords[i + 1]);

    if (rowIndex1 !== -1 && rowIndex2 !== -1) {
      const div1 = getWordDiv(i, rowIndex1);
      const div2 = getWordDiv(i + 1, rowIndex2);

      if (div1 && div2) {
        const x1 = div1.offsetLeft + div1.offsetWidth; // Right edge of the left word
        const y1 = div1.offsetTop + div1.offsetHeight / 2; // Vertical center of the left word
        const x2 = div2.offsetLeft; // Left edge of the right word
        const y2 = div2.offsetTop + div2.offsetHeight / 2; // Vertical center of the right word

        return { x1, y1, x2, y2 };
      }
    }
  }

  const getWordDiv = (columnIndex: number, wordIndex: number) => {
    return (
      (ref.current?.querySelector(
        `.column:nth-child(${columnIndex + 1}) > div:nth-child(${
          wordIndex + 2
        })`
      ) as HTMLElement | undefined) ?? undefined
    );
  };

  useEffect(() => {
    calculateLineCoordinates();

    window.addEventListener("resize", calculateLineCoordinates);
    return () => {
      window.removeEventListener("resize", calculateLineCoordinates);
    };
  }, [columns, matches, ref.current]);

  const w = ref.current?.offsetWidth ?? 0;
  const h = ref.current?.offsetHeight ?? 0;

  // Event handler for when a word is dragged.
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    columnIndex: number,
    word: string
  ) => {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ columnIndex, word })
    );
  };

  // Event handler for when a word is dragged over another word.
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Ensure that the drag is over a valid target.
    event.dataTransfer.dropEffect = "move";
  };

  // Event handler for when a word is dropped.
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetColumnIndex: number,
    targetWord: string
  ) => {
    event.preventDefault();
    const droppedWord: { columnIndex: number; word: string } = JSON.parse(
      event.dataTransfer.getData("text/plain")
    );

    if (droppedWord.columnIndex === -1 || targetColumnIndex === -1) return;

    // If the word was dropped within the same column
    if (droppedWord.columnIndex === targetColumnIndex) return;

    // Make a copy of the matches array to avoid mutating the state directly.
    const newMatches = [...matches];

    // If the word was dropped in a different column
    // Find existing match between these words
    // If no existing match add new match

    // Check if there is an existing match between the dropped word and the target word.
    const sourceMatch = newMatches.find(
      (match) => match[droppedWord.columnIndex] === droppedWord.word
    );
    const targetMatch = newMatches.find(
      (match) => match[targetColumnIndex] === targetWord
    );
    let m = sourceMatch || targetMatch;

    // If there's no existing match, add a new match.
    if (!m) {
      m = headers.map(() => ".");
      newMatches.push(m);
    }

    m[droppedWord.columnIndex] = droppedWord.word;
    m[targetColumnIndex] = targetWord;

    if (m.length !== columns.length) {
      console.log("WordMatchE3", columns.length, m.length);
      throw new Error("WordMatchE3");
    }

    // Update the state with the new matches.
    setMatches?.(newMatches);
  };

  const handleLineClick = (matchIndex: number, columnIndex: number) => {
    console.log("handleLineClick", matchIndex, columnIndex);
    setMatches(
      produce(matches, (matches) => {
        matches[matchIndex][columnIndex] = ".";
        matches[matchIndex][columnIndex + 1] = ".";
      }).filter((m) => !m.every((w) => w === "."))
    );
  };

  return (
    <div
      ref={ref}
      className="word-match"
      style={{
        position: "relative",
        display: "flex",
        gap: "1em",
      }}
    >
      {headers.map((header, columnIndex) => (
        <div key={columnIndex} className="column" style={{ flex: "auto" }}>
          <h3>{header}</h3>
          {columns[columnIndex].map((word, rowIndex) => (
            <div
              key={rowIndex}
              style={{ border: "solid black 1px" }}
              draggable
              onDragStart={(event) => handleDragStart(event, columnIndex, word)}
              onDragOver={(event) => handleDragOver(event)}
              onDrop={(event) => handleDrop(event, columnIndex, word)}
            >
              {word}
            </div>
          ))}
        </div>
      ))}
      <svg
        className="lines"
        style={{
          top: 0,
          left: 0,
          position: "absolute",
          pointerEvents: "none",
        }}
        viewBox={`0 0 ${w} ${h}`}
      >
        {lineCoordinates.map((match, matchIndex) =>
          match.map((line, columnIndex) =>
            line ? (
              <Fragment key={`${matchIndex}${columnIndex}`}>
                <line
                  stroke="transparent"
                  strokeWidth="10"
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  onClick={() => handleLineClick(matchIndex, columnIndex)} // Add click event handler
                  style={{ cursor: "pointer", pointerEvents: "auto" }}
                />
                <line
                  stroke="#000000"
                  strokeWidth="1"
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                />
              </Fragment>
            ) : null
          )
        )}
      </svg>
    </div>
  );
}
