// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import axios from "axios";

export const exampleApiAxios = axios.create({
  baseURL: process.env.REACT_APP_EXAMPLE_API_URL,
});
exampleApiAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const e = new Error(error.response?.data?.error ?? error.message);
    e.stack = error.stack;
    throw e;
  }
);
