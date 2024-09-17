// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import * as React from "react";

import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import "./flex.css";

export default function JsonViewer({ children }: { children: object }) {
  return (
    <JsonView
      data={children}
      shouldInitiallyExpand={() => true}
      style={{ ...darkStyles, container: `flex` }}
    />
  );
}
