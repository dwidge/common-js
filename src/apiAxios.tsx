// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import axios from "axios";
import { store } from "src/features/store";
import { selectActiveUser } from "src/features/users/select";

const { REACT_APP_API = "http://localhost:4002/api" } = process.env;
const baseURL = REACT_APP_API + "/v2";

export const apiAxios = axios.create({ baseURL });

apiAxios.interceptors.request.use((req) => {
  const token: string | undefined = selectActiveUser(store.getState())?.token;
  if (req.headers && token) req.headers.Authorization = token;

  return req;
});
