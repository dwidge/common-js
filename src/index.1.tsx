// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import ItemIndex from "../table";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function IndexScratch() {
  const name = "Asset",
    endpoint = "/file",
    columns = ["name"],
    filter = (v) => true,
    convert = (list) => list.map((name) => ({ id: name, name }));

  const navigate = useNavigate();

  return (
    <Stack>
      <Button
        aria-label="add"
        variant="contained"
        onClick={() => navigate("add")}
      >
        ++
      </Button>
      <ItemIndex {...{ name, endpoint, columns, filter, convert }} />
    </Stack>
  );
}
