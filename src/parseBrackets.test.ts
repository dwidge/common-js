// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { parseBrackets } from "./parseBrackets.ts";
import { expect } from "../test/expect.ts";

export function testSentence() {
  const inputString = "Aa bb {cc dd} dd aa {bb} cc dd dd {ee ee ff}.";
  const expectedResult = [
    "Aa bb ",
    "{cc dd}",
    " dd aa ",
    "{bb}",
    " cc dd dd ",
    "{ee ee ff}",
    ".",
  ];
  const result = parseBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

export function testEmptyString() {
  const inputString = "";
  const expectedResult: string[] = [];
  const result = parseBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

export function testNoBrackets() {
  const inputString = "No brackets in this string.";
  const expectedResult = ["No brackets in this string."];
  const result = parseBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

export function testLoneBracket() {
  const inputString = "{Bracket}";
  const expectedResult = ["{Bracket}"];
  const result = parseBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

export function testNestedBrackets() {
  const inputString = "{Outer {Nested} Bracket}";
  const expectedResult = ["{Outer {Nested} Bracket}"];
  const result = parseBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

export function testOnlyBrackets() {
  const inputString = "{First}{Second}{Third}";
  const expectedResult = ["{First}", "{Second}", "{Third}"];
  const result = parseBrackets(inputString);
  expect(result).toEqual(expectedResult);
}

export function testSpacedBrackets() {
  const inputString = "{First} {Second} {Third}";
  const expectedResult = ["{First}", " ", "{Second}", " ", "{Third}"];
  const result = parseBrackets(inputString);
  expect(result).toEqual(expectedResult);
}
