// SelectBox 1.1
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useMemo } from "react";
import generateId from "../../lib/utils/id.js";
import { FormControl } from "@mui/material";

export default function SelectBox({
  label = "Select",
  items,
  item: [value, setValue],
}) {
  const id = useMemo(() => generateId(20), []);
  const options = Array.isArray(items)
    ? items.map((v) => [v, v])
    : Object.entries(items);

  return (
    <FormControl fullWidth>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {options.map(([key, value], index) => (
          <option key={value} value={value}>
            {key}
          </option>
        ))}
      </select>
    </FormControl>
  );
}
