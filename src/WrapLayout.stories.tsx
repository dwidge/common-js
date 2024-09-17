// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { WrapLayout } from "./WrapLayout";
import { Button } from "../example/Button";

export default {
  title: "Extra/WrapLayout",
  component: WrapLayout,
};

export const Default = {
  args: {
    leftComponents: [
      <Button key="1">Left Component 1</Button>,
      <Button key="2">Left Component 2</Button>,
      <Button key="3">Left Component 3</Button>,
    ],
    rightComponents: [
      <Button key="1">Right Component 1</Button>,
      <Button key="2">Right Component 2</Button>,
    ],
  },
};

export const SingleComponent = {
  args: {
    leftComponents: [<Button key="1">Single Left Component</Button>],
    rightComponents: [<Button key="1">Single Right Component</Button>],
  },
};

export const NoComponents = {
  args: {
    leftComponents: [],
    rightComponents: [],
  },
};
