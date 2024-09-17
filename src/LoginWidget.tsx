// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useLogin } from "../../hooks/useToken";

export function LoginWidget() {
  const login = useLogin();

  return login.busy ? (
    <div>Loading...</div>
  ) : login.data ? (
    <button onClick={() => login.reset()}>Logout</button>
  ) : (
    <LoginForm
      onSubmit={({ email = "", password = "" }) =>
        login.mutate({ email, password })
      }
      error={login.error?.message}
    />
  );
}

export function LoginForm({
  defaultValue = { email: "", password: "" },
  onSubmit,
  error,
}: {
  defaultValue?: { email: string; password: string };
  onSubmit: (v: { email: string; password: string }) => void;
  error?: string;
}) {
  return (
    <form
      style={{ display: "flex", gap: "1em" }}
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          email: { value: string };
          password: { value: string };
        };
        onSubmit({
          email: target.email.value,
          password: target.password.value,
        });
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
      <button id="submit" key="submit" type="submit">
        Login
      </button>
      {error && <div>{error.toString()}</div>}
    </form>
  );
}
