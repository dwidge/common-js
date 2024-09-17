// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { styled } from "styled-components";

export const Flex = styled.div`
  position: relative;
  flex: auto;
  display: flex;
  box-sizing: border-box;
`;
export const Fill = styled(Flex)`
  justify-content: stretch;
  align-items: stretch;
`;
export const Center = styled(Flex)`
  justify-content: center;
  align-items: center;
`;
export const Fix = styled(Fill)`
  flex: 0;
`;
export const Vertical = styled(Fill)`
  flex-direction: column;
`;
export const Horizontal = styled(Fill)`
  flex-direction: row;
`;
export const Relative = styled.div`
  flex: auto;
  position: relative;
  display: flex;
`;
export const Square = styled(Fill)<{ size: [w: string, h: string] }>(
  ({ size: [w, h] = ["100em", "100em"] }) => `
  width: ${w};
  height: ${h};
`
);
