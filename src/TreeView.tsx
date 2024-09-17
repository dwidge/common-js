// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import "./TreeView.css";
import { State } from "../types/State";

export type TreeNode = {
  id: string;
  name: string;
  children: TreeNode[];
};

type TreeViewProps = {
  node: TreeNode;
  active: State<TreeNode | undefined>;
  style?: {
    "--normal-bg": string;
    "--active-bg": string;
  } & React.CSSProperties;
};

export const TreeView: React.FC<TreeViewProps> = ({ node, active, style }) => {
  return (
    <div
      style={{
        flex: "auto",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {TreeItem({ node, active })}
    </div>
  );
};

const TreeItem: React.FC<TreeViewProps> = ({
  node,
  active: [active, setActive],
}) => {
  const isSelected = active && active.id === node.id;

  return (
    <div className="treeview">
      <span
        onClick={() => setActive?.(node)}
        className={isSelected ? "active" : ""}
      >
        {node.name}
      </span>
      {node.children.map((child) => (
        <TreeView key={child.id} node={child} active={[active, setActive]} />
      ))}
    </div>
  );
};
