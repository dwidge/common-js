// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

export default function useText(init = "", opts = { fullWidth: true }) {
  const [v, setv] = useState(init);
  useEffect(() => {
    setv(init);
  }, [init]);
  const C = (
    <TextField value={v} onChange={(e) => setv(e.target.value)} {...opts} />
  );
  return [v, C];
}

export const useMultilineText = (val, opts) =>
  useText(val, { fullWidth: true, multiline: true, rows: 5, ...opts });
