// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import SwitchUserView from "./SwitchUserView";
import jwt_decode from "jwt-decode";
import { User } from "@dwidge/api/types/User";
import { UserToken } from "../UserToken";
import { LoginForm, LogoutForm } from "src/pages/forms/LoginForm";
import { apiHooks } from "../apiHooks";
import { AxiosError } from "axios";

import { useQueryClient } from "@tanstack/react-query";
import { anon } from "src/features/users/select";

export function LoginDialog({
  users = [],
  activeUser,
  switchUser,
  delUser,
}: {
  users: User[];
  activeUser: UserToken | null;
  switchUser: (v: UserToken | null) => void;
  delUser: (v: UserToken) => void;
}) {
  const setActiveUser = (newUser: UserToken | null) => {
    if (!newUser) delUser(activeUser);
    switchUser(newUser ?? anon);
    setTimeout(() => queryClient.resetQueries(), 0);
  };
  const queryClient = useQueryClient();

  const onComplete = (token: string) => {
    const claims = jwt_decode<User>(token);
    setActiveUser({ ...claims, token });
    setopen(false);
  };

  const [open, setopen] = useState(false);
  const loginRoute = apiHooks.useLogin();

  return (
    <>
      <Button
        style={{
          display: "flex",
          flex: "0",
        }}
        variant="contained"
        onClick={() => setopen(true)}
      >
        {activeUser.token ? activeUser.firstName : "Login"}
      </Button>
      <Dialog
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SwitchUserView users={users} user={[activeUser, setActiveUser]} />
        {!activeUser.token ? (
          <LoginForm
            onSubmit={async ({ email = "", password = "" }) =>
              onComplete(await loginRoute.mutateAsync({ email, password }))
            }
            error={
              loginRoute.error instanceof AxiosError
                ? loginRoute.error.response?.data?.message ??
                  loginRoute.error.message
                : loginRoute.error
            }
          />
        ) : (
          <LogoutForm onSubmit={async () => setActiveUser(null)} />
        )}
      </Dialog>
    </>
  );
}
