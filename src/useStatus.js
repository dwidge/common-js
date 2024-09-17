// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Alert } from "@mui/material";

/**
 * @typedef {import('react').JSX.Element} JSXElement
 * @typedef {{ [key: string]: string }} Status
 * @param {Status} status
 * @returns {JSXElement[]}
 */

export const useStatus = (status) =>
  Object.entries(status || {})
    .filter(([k, v]) => v)
    .map(([k, v]) => (
      <Alert key={k} severity={k}>
        {v}
      </Alert>
    ));
