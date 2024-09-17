// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { UserEvent } from "src/utils/UserEvent";
import { closeMuiModal } from "src/utils/closeMuiModal";

export async function login(u: UserEvent, email: string, password: string) {
  await u.click(screen.getByRole("button", { name: "Anon" }));
  await u.click(screen.getByRole("button", { name: "login" }));
  await u.type(screen.getByTestId("email"), email);
  await u.type(screen.getByTestId("password"), password);
  await u.click(screen.getByRole("button", { name: "submit" }));

  await closeMuiModal(u);
  await waitForElementToBeRemoved(() => screen.queryAllByText(/submit/i));
  await screen.findByRole("tab", { name: "Items" });

  // await waitForElementToBeRemoved(() => screen.queryAllByText(/submit/i));
  // await closeMuiModal();
  // await waitForElementToBeRemoved(() => screen.queryAllByText(/login/i));
}
