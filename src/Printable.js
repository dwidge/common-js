// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useRef } from "react";
import { Stack, Button, Paper } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { styled } from "styled-components";

export function Printable({ children }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Paper>
      <Stack p={2}>
        <PrintableDiv ref={componentRef}>{children}</PrintableDiv>
        <Button variant="contained" onClick={handlePrint}>
          Print
        </Button>
      </Stack>
    </Paper>
  );
}

const PrintableDiv = styled.div`
  @media print {
    color: black;
  }
  @page {
    margin: 3em !important;
  }
`;
