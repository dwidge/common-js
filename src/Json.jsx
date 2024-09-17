// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";

export function Json({ value }: { value: any }) {
  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      {JSON.stringify(value, null, 2)}
    </div>
  );
}
