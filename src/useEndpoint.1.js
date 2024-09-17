// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import axios from "axios";
import config from "../config";

export const request = ({ url, token, headers, ...opts }) => {
  console.log(config.api + url, { url, token, headers, ...opts });
  return axios({
    url: config.api + url,
    headers: token ? { Authorization: `Bearer ${token}`, ...headers } : {},
    ...opts,
  })
    .then((r) => {
      return r.data;
    })
    .catch((r) => {
      throw r.response?.data;
    });
};
