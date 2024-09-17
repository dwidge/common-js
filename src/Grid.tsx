// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import styled from "styled-components";

export const Vertical = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height3: 100%;
  background: yellow;
  align-items: stretch;
  flex: 1;
`;
export const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  height3: 100%;
`;
export const Fix = styled.div`
  width: 100%;
  flex: 0;
  position1: relative;
  background: green;
`;
export const Stretch = styled.div`
  width: 100%;
  flex: 1;
  position1: relative;
  background: blue;
`;
