// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { styled } from "styled-components";

export default function TextFlow({
  text,
  children,
}: React.PropsWithChildren<{
  text: string;
}>) {
  if (text)
    return (
      <Margin>
        <Float>{children}</Float>
        <Text>{text}</Text>
      </Margin>
    );
  else return <>{children}</>;
}

const Margin = styled.div`
  position: relative;
  flex: auto;
  margin: -1em;
`;
const Float = styled.div`
  width: 50%;
  float: left;
  padding: 1em;

  @media (max-width: 40em) {
    width: 100%;
  }
`;
const Text = styled.div`
  padding: 1em;
  white-space: pre-line;
`;
