// Copyright DWJ 2023.
// Made with ChatGPT.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const { findDuplicateKeys } = require("./findDuplicateKeys");

// const anyOrder = expect.toIncludeSameMembers;
const anyOrder = expect.arrayContaining;

const testCases = [
  {
    key: "x",
    input: [],
    expectedOutput: [],
  },
  {
    key: "id",
    input: [{ id: 3 }, { id: 4 }, { id: 3 }, { id: 5 }],
    expectedOutput: [
      {
        where: anyOrder([
          [0, "id"],
          [2, "id"],
        ]),
        value: 3,
      },
    ],
  },
  {
    key: "name",
    input: [
      { id: 3, name: "John" },
      { id: 4, name: "Jane" },
      { id: 3, name: "Jack" },
    ],
    expectedOutput: [],
  },
  {
    key: "name",
    input: [
      { id: 3, name: "John" },
      { id: 4, name: "Jane" },
      { id: 3, name: "Jane" },
    ],
    expectedOutput: [
      {
        where: anyOrder([
          [1, "name"],
          [2, "name"],
        ]),
        value: "Jane",
      },
    ],
  },
  {
    key: "id",
    input: [
      { id: 3, name: "John" },
      { id: 4, name: "Jane" },
      { id: 3, name: "Jack" },
    ],
    expectedOutput: [
      {
        where: anyOrder([
          [0, "id"],
          [2, "id"],
        ]),
        value: 3,
      },
    ],
  },
  {
    key: "name",
    input: [
      {
        people: [
          { id: 3, name: "John" },
          { id: 4, name: "Jane" },
          { id: 3, name: "Jack" },
        ],
      },
      {
        people: [
          { id: 3, name: "AppleJohn" },
          { id: 3, name: "AppleJack" },
          { id: 3, name: "Jane" },
        ],
      },
      {
        friends: [
          { id: 3, name: "AppleJohn" },
          { id: 3, name: "AppleJack" },
          { id: 3, name: "Jane" },
        ],
      },
    ],
    expectedOutput: [
      {
        where: anyOrder([
          [0, "people", 1, "name"],
          [1, "people", 2, "name"],
        ]),
        value: "Jane",
      },
    ],
  },
  {
    key: "id",
    input: [
      {
        id: 3,
        AAA: [{ id: 3 }, { id: 8 }],
        BBB: [{ id: 4, CCC: [{ id: 77 }] }],
      },
      { id: 4, AAA: [{ id: 8 }], BBB: [{ id: 5, CCC: [{ id: 77 }] }] },
    ],
    expectedOutput: [
      {
        where: anyOrder([
          [0, "AAA", 1, "id"],
          [1, "AAA", 0, "id"],
        ]),
        value: 8,
      },
      {
        where: anyOrder([
          [0, "BBB", 0, "CCC", 0, "id"],
          [1, "BBB", 0, "CCC", 0, "id"],
        ]),
        value: 77,
      },
    ],
  },
  {
    key: "id",
    input: [
      {
        id: 3,
        EEE: [{ id: 3 }, { id: 8 }],
        BBB: [{ id: 4, CCC: [{ id: 77 }] }],
      },
      { id: 4, AAA: [{ id: 8 }], BBB: [{ id: 5, CCC: [{ id: 77 }] }] },
    ],
    expectedOutput: [
      {
        where: anyOrder([
          [0, "BBB", 0, "CCC", 0, "id"],
          [1, "BBB", 0, "CCC", 0, "id"],
        ]),
        value: 77,
      },
    ],
  },
];

test.each(testCases)(
  "[$#] finds duplicate '$key' in a deep array",
  ({ key, input, expectedOutput }) => {
    const result = findDuplicateKeys(input, key);
    expect(result).toIncludeSameMembers(expectedOutput);
  }
);
