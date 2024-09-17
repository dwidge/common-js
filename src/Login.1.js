// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";

export function Login({
  authorization = "",
  login = async ({ email = "", password = "" }) => "",
  isLoading = false,
  error,
  defaultValue = { email: "", password: "" },
}) {
  if (authorization)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <input id="submit" key="submit" type="submit" value="Logout" />
      </form>
    );
  else
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login({
              email: e.target.email.value,
              password: e.target.password.value,
            }).catch(() => {});
          }}
        >
          <input
            id="email"
            key="email"
            placeholder="email"
            autoComplete="current-email"
            type="email"
            required
            defaultValue={defaultValue.email}
          />
          <input
            id="password"
            key="password"
            placeholder="password"
            autoComplete="current-password"
            type="password"
            required
            defaultValue={defaultValue.password}
          />
          <input
            id="submit"
            key="submit"
            type="submit"
            value={isLoading ? "..." : "Login"}
          />
        </form>
        {error ? <div>{error.toString()}</div> : null}
      </div>
    );
}
