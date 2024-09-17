// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// write a react component that takes an array of objects and renders a table of their fields in columns, each object is a row, titles are field names given in columns param.

import React from "react";

export function Table({ data, columns }) {
  return (
    <table style={{ borderCollapse: "separate", borderSpacing: "4px 0px" }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.field}>{row[column.field]?.toString()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
