// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import type { Decorator } from "@storybook/react";

export const fullscreenFlexbox: Decorator = (Story, context) =>
  context?.parameters?.layout === "fullscreen" ? (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: context?.parameters.flexDirection ?? "column",
      }}
    >
      <Story />
    </div>
  ) : (
    <Story />
  );
