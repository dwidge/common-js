// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Paper, Typography, Box } from "@mui/material";
import useEndpoint from "src/utils/useEndpoint";
import { Alert } from "@mui/material";
import tinyuid from "tiny-uid";
import { useSelector } from "react-redux";
import { selectActiveUser } from "src/features/users/select";
import { roleNames } from "example-api/types/Role";

const filterAny = () => true;
const convertAny = <T,>(response: T) => response;

export default function IndexNetwork({
  endpoint,
  filter = filterAny,
  convert = convertAny,
  ...opts
}) {
  const api = useEndpoint();
  const load = () =>
    api({ url: endpoint, method: "get" }).then((list) =>
      convert(list.filter(filter))
    );
  const remove = (i) => api({ url: endpoint + "/" + i, method: "delete" });
  return Index({ ...opts, load, remove });
}

export function Index({ name, columns, getGroup = undefined, load, remove }) {
  const user = useSelector(selectActiveUser);
  const admin = [
    roleNames.Tester,
    roleNames.Administrator,
    roleNames.Moderator,
  ].includes(user.roleId);

  const [msg, setMsg] = useState({});
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const reload = () =>
    load()
      .then(setList)
      .catch((e) => setMsg({ error: e.message }));

  useEffect(() => {
    reload();
  }, []);

  const view = (id = tinyuid()) => {
    navigate(id);
  };
  const edit = (id = tinyuid()) => {
    navigate(id + "/edit");
  };

  return (
    <Stack gap={2}>
      <h1>{name}</h1>
      {admin ? (
        <Button aria-label="add" variant="contained" onClick={() => edit()}>
          +
        </Button>
      ) : null}
      {Object.keys(msg || {}).map((k) => (
        <Alert key={k} severity={k}>
          {msg[k]}
        </Alert>
      ))}
      <ListGroup list={list} getGroup={getGroup}>
        {({ list, group }) => (
          <Paper key={group}>
            {group ? (
              <Typography variant="h5" m={2}>
                {group}
              </Typography>
            ) : null}
            {list.map((row) => (
              <Paper key={row.id}>
                <Stack direction="row">
                  {admin ? (
                    <Button
                      title={"remove " + (row.name ?? row.firstName ?? row.id)}
                      aria-label={
                        "remove " + (row.name ?? row.firstName ?? row.id)
                      }
                      onClick={() =>
                        remove(row.id)
                          .then((r) => setMsg({ success: r.message }))
                          .then(reload)
                      }
                    >
                      X
                    </Button>
                  ) : null}
                  <Box
                    padding={2}
                    onClick={() => view(row.id)}
                    style={{ cursor: "pointer" }}
                    sx={{ width: 1 }}
                  >
                    {columns.map((col) => (
                      <Typography key={col}>
                        {typeof col === "function" ? col(row) : row[col]}
                      </Typography>
                    ))}
                  </Box>
                  {admin ? (
                    <Button
                      aria-label={
                        "edit " + (row.name ?? row.firstName ?? row.id)
                      }
                      onClick={() => edit(row.id)}
                    >
                      {"\u270F"}
                    </Button>
                  ) : null}
                </Stack>
              </Paper>
            ))}
          </Paper>
        )}
      </ListGroup>
    </Stack>
  );
}

function ListGroup({ list, getGroup = () => null, children }) {
  const unique = (a) => [...new Set(a)];
  const keys = unique(list.map(getGroup));

  return keys.map((group) =>
    children({
      key: group,
      list: list.filter((item) => getGroup(item) === group),
      group,
    })
  );
}
