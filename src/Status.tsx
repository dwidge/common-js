// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { AlertColor } from "@mui/material";

export type AlertItem = [type: AlertColor, message: string];

export function Alerts({
  alerts = [],
  timeout = 1000,
}: {
  alerts?: AlertItem[];
  timeout?: number;
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    if (timeout) {
      const t = window.setTimeout(() => setShow(false), timeout);
      return () => window.clearTimeout(t);
    }
  }, [alerts]);

  if (!show) return null;
  return (
    <div>
      {alerts
        .filter((v) => v && v[1])
        .map(([k, v]) => (
          <Alert key={k} severity={k}>
            {v}
          </Alert>
        ))}
    </div>
  );
}

export function Status({
  status,
}: {
  status: { loading: boolean; success: boolean | null; message: string | null };
}) {
  if (status.loading) return <Alert severity={"info"}>Busy...</Alert>;
  if (status.success === true)
    return <Alert severity={"success"}>{status.message}</Alert>;
  if (status.success === false)
    return <Alert severity={"error"}>{status.message}</Alert>;
  return null;
}
