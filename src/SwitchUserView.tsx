// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { Tab, Tabs } from "@mui/material";
import { roleNameFromRoleId } from "src/features/users/select";
import { UserToken } from "../UserToken";

export default function SwitchUserView({
  users = [],
  user: [user, setUser],
}: {
  users: UserToken[];
  user: [UserToken, (v: UserToken) => void];
}) {
  return (
    <Box bgcolor="royalblue" sx={{ flexGrow: 1, textAlign: "center" }}>
      {roleNameFromRoleId(user?.roleId)}
      <AppBar position="static">
        <Tabs
          value={"user" + (user?.id ?? "0")}
          orientation="vertical"
          variant="scrollable"
        >
          {users.map((u) => (
            <Tab
              key={"user" + u.id}
              label={`${u.firstName} (${roleNameFromRoleId(u.roleId)})`}
              value={"user" + u.id}
              onClick={() => setUser(u)}
            />
          ))}
        </Tabs>
      </AppBar>
    </Box>
  );
}
