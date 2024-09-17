// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export function findBrackets(input: string): string[] {
  const matches: string[] = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "[") {
      if (depth === 0) {
        start = i + 1; // Start of a new match
      }
      depth++;
    } else if (input[i] === "]") {
      depth--;
      if (depth === 0 && start !== -1) {
        const match = input.slice(start, i);
        matches.push(match);
        start = -1; // Reset start position
      }
    }
  }

  return matches;
}
