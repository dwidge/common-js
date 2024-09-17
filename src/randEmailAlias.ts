// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { randDigits } from "./randDigits.js";

export const randEmailAlias = (
  email: string,
  alias = "test_" + randDigits()
) => {
  const [user, domain] = email.split("@");
  return `${user}+${alias}@${domain}`;
};
