// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import * as React from "react";

import { Link } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Nav({
  routes,
  children,
}: React.PropsWithChildren<{ routes: { [k: string]: string } }>) {
  const location = useLocation();
  const routeEntries = Object.entries(routes);
  const route = "/" + location.pathname.split("/")?.[1];
  const exists = routeEntries.some(([, val]) => val === route);
  return (
    <Tabs
      style={{
        display: "flex",
        flex: "auto",
      }}
      value={exists && route}
      variant="scrollable"
    >
      {routeEntries.map(([key, val]) => (
        <Tab key={key} label={key} value={val} component={Link} to={val} />
      ))}
      {children}
    </Tabs>
  );
}
