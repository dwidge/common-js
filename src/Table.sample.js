// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";

const data = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Bob", age: 35 },
];

const columns = [
  { name: "Name", field: "name" },
  { name: "Age", field: "age" },
];

function App() {
  return <Table data={data} columns={columns} />;
}
