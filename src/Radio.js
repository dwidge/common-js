// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { randId } from "./randId";

export function Radio({
  name = "radio" + randId(),
  options = ["yes", "no"],
  value: [value, setValue] = ["", (v = "") => {}],
}) {
  return (
    <div>
      {options.map((option, index) => (
        <div key={`${name}-${index}`}>
          <input
            type="radio"
            name={name}
            id={`${name}-${index}`}
            value={option}
            // checked={option === value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor={`${name}-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}
