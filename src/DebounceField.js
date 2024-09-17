// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useEffect, useState, useRef } from "react";

export const DebounceField = ({
  value,
  onChange,
  timeout = 1000,
  children,
}) => {
  const [v, setv] = useState(value);
  const timer = useRef(null);

  useEffect(() => {
    setv(value);
  }, [value]);
  return children({
    value: v,
    onChange: (v) => {
      setv(v);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => onChange(v), timeout);
    },
  });
};
