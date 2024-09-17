// ArrowPad 1.0
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import styled from "styled-components";

const up = "ArrowUp";
const down = "ArrowDown";
const left = "ArrowLeft";
const right = "ArrowRight";

const moves = {
  [up]: ([x, y]) => [x, y - 1],
  [down]: ([x, y]) => [x, y + 1],
  [left]: ([x, y]) => [x - 1, y],
  [right]: ([x, y]) => [x + 1, y],
};
const nop = (a) => a;

export const dirFromKey = (key) => moves[key] || nop;

const ArrowPad = ({ onClick }) => (
  <Rows>
    <ButtonGroup variant="contained">
      <Button onClick={() => onClick({ key: up })}>&uarr;</Button>
    </ButtonGroup>
    <ButtonGroup variant="contained">
      <Button onClick={() => onClick({ key: left })}>&larr;</Button>
      <Button onClick={() => onClick({ key: down })}>&darr;</Button>
      <Button onClick={() => onClick({ key: right })}>&rarr;</Button>
    </ButtonGroup>
  </Rows>
);

const Rows = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default ArrowPad;
