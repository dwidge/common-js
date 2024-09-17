// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { styled } from "styled-components";

export const Vertical = styled.div`
  position: relative;
  flex: auto;
  display: flex;
  flex-direction: column;
`;
export const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;
export const Fix = styled.div`
  flex: 0;
  position: relative;
`;
export const Stretch = styled.div`
  flex: 1;
  position: relative;
`;
export const Full = styled.div`
  flex: 1;
  position: relative;
  min-height: 100%;
`;
