// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { SWRConfig } from "swr";

export function ApiContext({
  baseUrl,
  children,
}: React.PropsWithChildren<{ baseUrl?: string }>) {
  return <SWRConfig value={{ fallback: { baseUrl } }}>{children}</SWRConfig>;
}
