// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { isBrackets } from "./parseBrackets";

export default function InputBrackets({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const handleInputChange = (index: number, v: string) => {
    const newData = [...value];
    newData[index] = v;
    onChange(newData);
  };

  return (
    <div>
      {value.map((item: string, index: number) => {
        if (isBrackets(item)) {
          return (
            <input
              key={index}
              value={item.slice(1, -1)}
              onChange={(e) => handleInputChange(index, `{${e.target.value}}`)}
            />
          );
        }
        return <span key={index}>{item}</span>;
      })}
    </div>
  );
}
