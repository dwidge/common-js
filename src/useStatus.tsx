// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useState } from "react";
import { Alert } from "@mui/material";

/**
 * @typedef {import('react').JSX.Element} JSXElement
 * @typedef {[JSXElement[], React.Dispatch<React.SetStateAction<{ [key: string]: string }>]} UseStatusReturnType
 * @returns {UseStatusReturnType}
 */

export const useStatus = () => {
  const [msg, setMsg] = useState({});

  const component = Object.keys(msg || {}).map((k) => (
    <Alert key={k} severity={k}>
      {msg[k]}
    </Alert>
  ));

  return [component, setMsg];
};
