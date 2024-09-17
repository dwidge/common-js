// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import axios from "axios";
import { config } from "./config";
import { useSelector } from "react-redux";

const useEndpoint = () => {
  const { token } = useSelector((state) => state.login);
  return ({ ...a }) => request({ token, ...a });
};

const request = ({ url, token, headers, ...opts }) =>
  axios({
    url: config.apiUrl + url,
    headers: { Authorization: `Bearer ${token}`, ...headers },
    ...opts,
  }).then((r) => r.body);

export default useEndpoint;
