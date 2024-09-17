// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const isBrackets = (item: string) =>
  item.startsWith("{") && item.endsWith("}");

export function parseBrackets(inputString: string): string[] {
  const result: string[] = [];
  let currentText = "";
  let currentBracket = "";
  let bracketCount = 0;

  const saveCurrentText = () => {
    if (currentText !== "") {
      result.push(currentText);
      currentText = "";
    }
  };

  const saveCurrentBracket = () => {
    if (currentBracket !== "") {
      result.push(currentBracket);
      currentBracket = "";
    }
  };

  for (const char of inputString) {
    if (char === "{") {
      bracketCount++;
      saveCurrentText();
      currentBracket += char;
    } else if (char === "}") {
      bracketCount--;
      currentBracket += char;

      if (bracketCount === 0) {
        saveCurrentBracket();
      }
    } else {
      if (currentBracket === "") {
        currentText += char;
      } else {
        currentBracket += char;
      }
    }
  }

  saveCurrentText();
  saveCurrentBracket();

  return result;
}
