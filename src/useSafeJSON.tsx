// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useEffect } from "react";
import { useState } from "react";

export function useSafeJSON([value, onChange]: [string, (v: string) => void]): [
  string,
  (s: string) => void,
  string
] {
  const [cache, setCache] = useState(value);
  const [error, setMsg] = useState("");

  useEffect(() => {
    setCache(value);
  }, [value]);

  const tryChange = (s: string) => {
    setCache(s);
    try {
      onChange(JSON.stringify(JSON.parse(s)));
      setMsg("");
    } catch (e) {
      if (e instanceof Error) setMsg(e.message);
      else setMsg("error");
    }
  };
  return [cache, tryChange, error];
}
