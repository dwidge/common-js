// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, {
  useState,
  createContext,
  useContext,
  CSSProperties,
} from "react";
import styled from "@emotion/styled";
import { Row, Column } from "./View";

const MenuButton = styled.div`
  flex: 1;
  display: flex;
  padding: 1em;
  cursor: pointer;
  position: relative;
  border: solid 1px transparent;
  background-color: inherit;

  &:hover {
    background-color: gray;
  }
`;

const Dropdown = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  border: solid 1px gray;
  position: absolute;
  left: 0;
  background-color: inherit;
  z-index: 10;

  a {
    justify-content: center;
    color: inherit;
    padding: 1em;
    text-decoration: none;
    display: block;

    &:hover {
      background-color: gray;
    }
  }
`;

const MenuContext = createContext<
  [openIndex: string, setOpenIndex: (v: string) => unknown] | undefined
>(undefined);

export const MenuBar: React.FC<{
  children: React.ReactNode;
  style?: CSSProperties;
}> = ({ children, style }) => (
  <Row style={style}>
    <MenuGroup>{children}</MenuGroup>
  </Row>
);

export const MenuGroup: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <MenuContext.Provider value={useState("")}>{children}</MenuContext.Provider>
);

export const MenuItem: React.FC<{
  name: string;
  float?: boolean;
  children: React.ReactNode;
}> = ({ name, children }) => {
  const [openIndex, setOpenIndex] = useContext(MenuContext) ?? useState("");
  const isOpen = name === openIndex;

  return (
    <Column>
      <MenuButton onClick={() => setOpenIndex(isOpen ? "" : name)}>
        {name}
      </MenuButton>
      <Column>
        <Dropdown
          className="dropdown"
          show={isOpen}
          onClick={() => setOpenIndex("")}
        >
          <MenuGroup>{children}</MenuGroup>
        </Dropdown>
      </Column>
    </Column>
  );
};
