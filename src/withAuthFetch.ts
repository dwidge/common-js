// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Auth, Login } from "@dwidge/types";
import { Fetch, useFetch } from "@dwidge/query";
import { apiAxios } from "../utils/apiAxios.js";
import { useLoginApi } from "../fetch/index.js";
import { getAuthFromToken } from "../utils/token.js";
import { z } from "zod";
import { api, tester } from "./env.js";

export type AuthFetch = { auth: Auth; fetch: Fetch };
export const withAuthFetch = async (
  baseURL = api.host,
  creds: Login = tester
): Promise<AuthFetch> => {
  baseURL = z.string().min(1).parse(baseURL);
  creds = Login.parse(creds);
  const loginApi = useLoginApi(useFetch(apiAxios, baseURL));
  const token = await loginApi.login(creds);
  const auth = getAuthFromToken(token)!;
  const fetch = useFetch(apiAxios, baseURL, token);
  return { auth, fetch };
};
