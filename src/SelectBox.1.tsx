// SelectBox 1.1
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function SelectBox({
  label = "Select",
  items,
  item: [item, setitem],
}: {
  label: string;
  items: string[] | { [i: string]: string };
  item: [item: string, setitem: (i: string) => void];
}) {
  const list = Array.isArray(items)
    ? items.map((v) => [v, v])
    : Object.entries(items);

  return (
    <TextField
      select
      value={item}
      label={label}
      onChange={(e) => setitem(e.target.value)}
    >
      {list.map(([i, v]) => (
        <MenuItem key={i} value={v}>
          {i}
        </MenuItem>
      ))}
    </TextField>
  );
}
