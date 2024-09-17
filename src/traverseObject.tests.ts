// Copyright DWJ 2023.
// Made with ChatGPT.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const { traverseObject } = require("./traverseObject");

// ChatGPT
describe("traverseObject", () => {
  const obj = {
    a: {
      b: {
        c: "hello",
        d: [1, 2, 3],
      },
      e: null,
      f: undefined,
    },
    g: "world",
  };

  test.each([
    ["object", obj, ["a", "b", "c"], "hello"],
    ["array", obj, ["a", "b", "d", 1], 2],
    ["null", obj, ["a", "e"], null],
    ["undefined", obj, ["a", "f"], undefined],
    ["string", obj, ["g"], "world"],
  ])(
    "should traverse %s value and return expected result",
    (type, obj, path, expected) => {
      const callback = jest.fn();
      traverseObject(obj, callback);
      expect(callback).toHaveBeenCalledWith(expected, path);
    }
  );

  test("should handle empty object", () => {
    const obj = {};
    const callback = jest.fn();
    traverseObject(obj, callback);
    expect(callback).not.toHaveBeenCalled();
  });

  test("should handle null object", () => {
    const obj = null;
    const callback = jest.fn();
    traverseObject(obj, callback);
    expect(callback).toHaveBeenCalledWith(null, []);
  });

  test("should handle undefined object", () => {
    const obj = undefined;
    const callback = jest.fn();
    traverseObject(obj, callback);
    expect(callback).toHaveBeenCalledWith(undefined, []);
  });
});
