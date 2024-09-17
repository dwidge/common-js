// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { Tab, Tabs } from "@mui/material";

export default function Multi({ users = [], user: [user, setUser] }) {
  return (
    <Box bgcolor="royalblue" sx={{ flexGrow: 1, textAlign: "center" }}>
      {user?.role}
      <AppBar position="static">
        <Tabs value={user?.email ?? false} orientation="vertical">
          {users.map((u) => (
            <Tab
              key={u.email}
              label={u.email}
              value={u.email}
              onClick={() => setUser(u)}
            />
          ))}
        </Tabs>
      </AppBar>
    </Box>
  );
}
