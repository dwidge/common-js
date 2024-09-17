// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { styled } from "styled-components";
import { Input, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Row } from "@dwidge/react-lib/utils/csv";
import { upsert } from "@dwidge/react-lib/utils/upsert";

const firstKey = (o: object = {}) => Object.keys(o)[0];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export function BasicTable({
  rows = [],
  keyCol = firstKey(rows[0]),
  showCol = Object.keys(rows[0] ?? {}).slice(1),
  onChange,
  ...opts
}: {
  rows: Row[];
  keyCol?: string;
  showCol?: string[];
  onChange?: (rows: Row[]) => void;
}) {
  const cols: [col: string, align: "left" | "right"][] = showCol.map(
    (col, i) => [
      col,
      i > 0 && rows.some((row) => ["number"].includes(typeof row[col]))
        ? "right"
        : "left",
    ]
  );

  return (
    <TableContainer component={Paper}>
      <Table {...opts}>
        <TableHead>
          <TableRow>
            {cols.map(([col, align]) => (
              <StyledTableCell key={col} align={align}>
                {col}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row[keyCol] ?? Math.random()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {cols.map(([col, align]) => (
                <TableCell key={col} align={align}>
                  {row[col] != null && onChange ? (
                    <Input
                      sx={{ input: { textAlign: align } }}
                      value={row[col]}
                      onChange={(e) => {
                        onChange(
                          upsert(rows, (r) => row[keyCol] === r[keyCol], {
                            ...row,
                            [col]: e.target.value,
                          })
                        );
                      }}
                    />
                  ) : (
                    row[col]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
