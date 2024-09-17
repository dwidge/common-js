// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { styled } from "styled-components";

export const Scroll = ({
  children,
  style,
  ...props
}: React.PropsWithChildren<{ style?: React.CSSProperties }>) => (
  <Relative style={style} {...props}>
    <Absolute>{children}</Absolute>
  </Relative>
);

const Relative = styled.div.attrs({
  className: "Relative",
})`
  flex: auto;
  position: relative;
  overflow-y: scroll;
`;
const Absolute = styled.div.attrs({
  className: "Absolute",
})`
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
