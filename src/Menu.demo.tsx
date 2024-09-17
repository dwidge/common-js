// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Link } from "react-router-dom";
import { MenuBar, MenuItem } from "./Menu";

export const MenuDemo: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <MenuBar>
        <MenuItem name="1">
          <Link to="/option1">Option 1</Link>
          <Link to="/option2">Option 2</Link>
          <Link to="/option3">Option 3</Link>
          <MenuItem name="1">
            <Link to="/option4">Option 4</Link>
            <Link to="/option5">Option 5</Link>
          </MenuItem>
          <MenuItem name="2">
            <Link to="/option6">Option 6</Link>
            <Link to="/option7">Option 7</Link>
            <MenuItem name="1">
              <Link to="/option4">Option 4</Link>
              <Link to="/option5">Option 5</Link>
            </MenuItem>
          </MenuItem>
        </MenuItem>
        <MenuItem name="2">
          <Link to="/option8">Option 8</Link>
          <Link to="/option9">Option 9</Link>
        </MenuItem>
      </MenuBar>
    </div>
  );
};
