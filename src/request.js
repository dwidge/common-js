// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import axios from "axios";
import { logBlue, logRed } from "./logColor";
import { REACT_APP_API } from "../env";

export const api = axios.create({
  baseURL: REACT_APP_API,
  //validateStatus: (status) => true,
});

api.interceptors.request.use(
  function (config) {
    if (config.token)
      config.headers["Authorization"] = `Bearer ${config.token}`;
    const { method, url } = config;
    return config;
  },
  function (error) {
    const { method, url } = error.config;
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const { method, url } = response.config;
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const { method, url } = error.config;
    return Promise.reject(error.response?.data ?? error);
  }
);
