// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { findBrackets } from "./findBrackets.ts";
import { expect } from "../test/expect.ts";

// Test case 1: Single match
export function testSingleMatch() {
  const inputString = "Hello [world]!";
  const expectedResult = ["world"];
  const result = findBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

// Test case 2: Multiple matches
export function testMultipleMatches() {
  const inputString = "I like [apples], [bananas], and [oranges].";
  const expectedResult = ["apples", "bananas", "oranges"];
  const result = findBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

// Test case 3: No matches
export function testNoMatches() {
  const inputString = "This is a normal string without brackets.";
  const expectedResult: string[] = [];
  const result = findBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

// Test case 4: Nested brackets
export function testNestedBrackets() {
  const inputString = "The quick [brown [fox]] jumps over [the [lazy] dog].";
  const expectedResult = ["brown [fox]", "the [lazy] dog"];
  const result = findBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

// Test case 5: Empty brackets
export function testEmptyBrackets() {
  const inputString = "I have [] brackets.";
  const expectedResult: string[] = [""];
  const result = findBrackets(inputString);
  expect(result).toEqual(expectedResult);
}
