// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useState } from "react";
import ExampleLogin from "example-login";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Multi from "./Multi";
import { Stack } from "@mui/material";

const loginModel = ([email, password]) => ({
  email,
  password,
});

const registerControls = [
  {
    id: 1,
    key: "firstName",
    type: "TEXT_INPUT",
    required: true,
    data: {
      placeholder: "First name",
    },
  },
  {
    id: 2,
    key: "lastName",
    type: "TEXT_INPUT",
    required: true,
    data: {
      placeholder: "Last name",
    },
  },
  {
    id: 3,
    key: "email",
    type: "TEXT_INPUT",
    required: true,
    data: {
      placeholder: "Email",
      validations: ["EMAIL"],
    },
  },
  {
    id: 4,
    key: "password",
    type: "TEXT_INPUT",
    required: true,
    data: {
      placeholder: "Password",
      type: "password",
      validations: ["PASSWORD"],
    },
  },
];

export default function LoginForm({
  users = [],
  user: [user, setuser],
  config: { loginUrl, registerUrl },
}) {
  const onComplete = (response) => {
    const { success, message, accessToken, data } = response;
    if (success && accessToken && data) {
      setuser({
        id: data.id,
        email: data.email,
        role: data.role,
        token: accessToken,
      });
      console.log(message);
      setopen(false);
    } else {
      console.error(response);
      alert(message);
    }
  };

  const login = {
    post: loginUrl,
    model: loginModel,
    callback: onComplete,
  };
  const register = {
    post: registerUrl,
    controls: registerControls,
    callback: onComplete,
  };

  const [open, setopen] = useState(false);

  if (user)
    return (
      <Stack
        direction="row"
        gap={2}
        sx={{ flexGrow: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        {user.email} ({user.role})
        <Button variant="contained" onClick={() => setuser()}>
          Log out
        </Button>
      </Stack>
    );
  else
    return (
      <Stack
        direction="row"
        gap={2}
        sx={{ flexGrow: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <Button variant="contained" onClick={() => setopen(true)}>
          Log in
        </Button>
        <Dialog
          open={open}
          onClose={() => setopen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Multi users={users} user={[user, setuser]} />
          <ExampleLogin login={login} register={register} />
        </Dialog>
      </Stack>
    );
}
