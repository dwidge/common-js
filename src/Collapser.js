// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export default function Collapser({ label = "", children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      >
        {label} {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </IconButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
}
