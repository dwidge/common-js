// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// ChatGPT

import { hasDuplicateFieldChildren } from "./duplicateField";

describe("hasDuplicateFieldChildren", () => {
  it("should return true when there are duplicate IDs", () => {
    const dupArray = [
      {
        id: 1,
        children: [
          { id: 2, children: [{ id: 6 }] },
          {
            id: 4,
          },
        ],
      },
      {
        id: 5,
        children: [
          {
            id: 6,
            children: [
              {
                id: 7,
              },
              {
                id: 8,
              },
            ],
          },
          {
            id: 9,
          },
        ],
      },
    ];
    expect(hasDuplicateFieldChildren(dupArray, "id")).toBe(true);
  });

  it("should return false when there are no duplicate IDs", () => {
    const uniqueArray = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 3,
              },
            ],
          },
          {
            id: 4,
          },
        ],
      },
      {
        id: 5,
        children: [
          {
            id: 6,
            children: [
              {
                id: 7,
              },
              {
                id: 8,
              },
            ],
          },
          {
            id: 9,
          },
        ],
      },
      {
        id: 10,
        children: [
          {
            id: 11,
          },
        ],
      },
    ];
    expect(hasDuplicateFieldChildren(uniqueArray, "id")).toBe(false);
  });

  it("should return true when there are duplicate names", () => {
    const arrayWithDupNames = [
      {
        id: 1,
        name: "John",
        children: [
          {
            id: 2,
            name: "Jane",
          },
          {
            id: 3,
            name: "John",
          },
        ],
      },
      {
        id: 4,
        name: "Samantha",
        children: [
          {
            id: 5,
            name: "Samantha",
          },
        ],
      },
    ];
    expect(hasDuplicateFieldChildren(arrayWithDupNames, "name")).toBe(true);
  });
});
