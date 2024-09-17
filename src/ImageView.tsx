// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import TextFlow from "./TextFlow";
import { styled } from "styled-components";

export default function ImageView({
  text,
  image,
}: {
  text: string;
  image: string;
}) {
  return (
    <TextFlow text={text}>
      <Image src={image} />
    </TextFlow>
  );
}

const Image = styled.img`
  width: 100%;
  pointer-events: none;
`;
