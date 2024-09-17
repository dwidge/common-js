// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Typography, Grid, Chip } from "@mui/material";

export function Header({ title, chips }) {
  return (
    <Grid container>
      <Grid item>
        <Typography color="inherit">{title}</Typography>
      </Grid>
      <Grid item xs={true}></Grid>
      <Grid item>
        {chips
          .filter((c) => c)
          .map((c) => (
            <Chip key={c} label={c} variant="outlined" />
          ))}
      </Grid>
    </Grid>
  );
}
