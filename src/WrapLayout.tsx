// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { ReactNode } from "react";
import styled from "styled-components";

export const WrapLayout: React.FC<{
  leftComponents: ReactNode;
  rightComponents: ReactNode;
}> = ({ leftComponents, rightComponents }) => {
  return (
    <Container>
      <FloatLeft>{leftComponents}</FloatLeft>
      <FloatRight>{rightComponents}</FloatRight>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: auto;
  flex-wrap: wrap;
`;

const FloatLeft = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FloatRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  justify-content: flex-end;
`;
