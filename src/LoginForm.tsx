// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Input, Stack } from "@mui/material";
import React from "react";

export function LoginForm({
  onSubmit = async ({ email = "", password = "" }) => {},
  isLoading = false,
  error,
  defaultValue = { email: "", password: "" },
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          email: e.target.email.value,
          password: e.target.password.value,
        }).catch(() => {});
      }}
    >
      <Stack padding={2} gap={2}>
        <Input
          id="email"
          key="email"
          placeholder="email"
          autoComplete="current-email"
          type="email"
          required
          defaultValue={defaultValue.email}
        />
        <Input
          id="password"
          key="password"
          placeholder="password"
          autoComplete="current-password"
          type="password"
          required
          defaultValue={defaultValue.password}
        />
        <Input
          id="submit"
          key="submit"
          type="submit"
          value={isLoading ? "..." : "Login"}
        />
        {error ? <div>{error.toString()}</div> : null}
      </Stack>
    </form>
  );
}

export function LogoutForm({ onSubmit = async () => {} }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Stack padding={2} gap={2}>
        <Input id="submit" key="submit" type="submit" value="Logout" />
      </Stack>
    </form>
  );
}
