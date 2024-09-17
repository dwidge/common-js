// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../features/users/select";
import { REACT_APP_API } from "../env";

const useEndpoint = () => {
  const { token } = useSelector(selectActiveUser);
  return useMemo(
    () => (opts) => userRequest({ token, ...opts }).then((r) => r.data),
    [token]
  );
};

export const request = ({ url, token, headers, ...opts }, setMsg) => {
  console.log(REACT_APP_API + url, { url, token, headers, ...opts });
  setMsg?.({ info: "Busy..." });
  return axios({
    url: REACT_APP_API + url,
    headers: { Authorization: `Bearer ${token}`, ...headers },
    ...opts,
  })
    .then((r) => {
      setMsg?.({ success: r.data?.message || "Success" });
      return r.data;
    })
    .catch((r) => {
      setMsg?.({ error: r.response?.data?.message || r.message || "Error" });
    });
};

export const userRequest = ({ url, token, headers, ...opts }) => {
  console.log(REACT_APP_API + url, { url, token, headers, ...opts });
  return axios({
    url: REACT_APP_API + url,
    headers: { Authorization: `Bearer ${token}`, ...headers },
    ...opts,
  });
};
export default useEndpoint;
