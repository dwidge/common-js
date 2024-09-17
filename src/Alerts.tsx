// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Alert, AlertColor } from "@mui/material";

export type Msg = [AlertColor, string];

export function Alerts({ msgs }: { msgs: Msg[] }) {
  return (
    <>
      {msgs.map(([severity, msg], i) => (
        <Alert key={i} severity={severity}>
          {msg}
        </Alert>
      ))}
    </>
  );
}
