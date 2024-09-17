// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Login } from "@dwidge/types";
import { Fetch } from "@dwidge/query";
import { z } from "zod";

export type LoginApi = {
  login: (creds: Login) => Promise<string>;
};
const routePath = "v2/login";

export const useLoginApi = (fetch: Fetch): LoginApi => ({
  login: (creds: Login) =>
    fetch("post", routePath, Login.parse(creds)).then((v) =>
      z.string().parse(v)
    ),
});
