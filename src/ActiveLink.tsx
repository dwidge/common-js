// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { useLocation } from "react-router-dom";

export const ActiveLink =
  (Active: React.ElementType, Inactive: React.ElementType) =>
  ({
    to,
    children,
    ...rest
  }: React.PropsWithChildren<{
    to: string;
  }>) => {
    const location = useLocation();
    const Link = location.pathname === to ? Active : Inactive;
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  };
