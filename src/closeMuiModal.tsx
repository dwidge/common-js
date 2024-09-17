// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { screen } from "@testing-library/react";
import { UserEvent } from "src/utils/UserEvent";

export async function closeMuiModal(u: UserEvent) {
  const dialog = screen.getByRole("dialog");
  const presentationElements = screen.queryAllByRole("presentation");
  await u.click(dialog);
  for (let element of presentationElements) {
    await u.click(element);
    if (dialog.contains(element)) {
      await u.click(element);
    }
  }
}
