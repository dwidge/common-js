// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Button from "./components/Button";

function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        role="alert"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5em",
        }}
      >
        <div>Something went wrong.</div>
        <pre
          style={{
            color: "#fcc",
            backgroundColor: "#0009",
            padding: "1em",
          }}
        >
          {error.message}
        </pre>
        <div
          role="alert"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5em",
          }}
        >
          <Button
            style={{ backgroundColor: "green" }}
            onClick={resetErrorBoundary}
          >
            Retry
          </Button>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => (localStorage.clear(), resetErrorBoundary())}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Fallback({
  children,
  onReset,
}: React.PropsWithChildren<{ onReset?: () => void }>) {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
}
