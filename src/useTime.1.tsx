// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useState, useEffect } from "react";
import { now } from "./now";

export const useTime = () => {
  const [time, setTime] = useState(now());
  useEffect(() => {
    const t = setInterval(() => setTime(now()), 5000);
    return () => clearTimeout(t);
  }, []);
  return time;
};
