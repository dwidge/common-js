// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

export default function AutoDataGrid({
  rows = [],
  width = [],
  idKey = Object.keys(rows[0] ?? {})[0],
}) {
  if (!rows.length) return <></>;

  const columns = Object.keys(rows[0]).map((k, i) => ({
    field: k,
    headerName: k,
    width: width[i] ?? 150,
  }));

  return (
    <Paper>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row[idKey]}
        />
      </div>
    </Paper>
  );
}
