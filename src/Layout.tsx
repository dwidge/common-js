// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { styled } from "styled-components";

export const MobileOnly = styled.div.attrs({
  className: "Layout-MobileOnly",
})`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const DesktopOnly = styled.div.attrs({
  className: "Layout-DesktopOnly",
})`
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const BottomRight = styled.div.attrs({
  className: "Layout-BottomRight",
})`
  pointer-events: auto;
  position: absolute;
  display: flex;
  bottom: 0;
  right: 0;
  padding: 1em;
`;
