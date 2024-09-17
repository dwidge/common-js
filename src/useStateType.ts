// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useState } from "react";
import { z } from "zod";

export const useStateType =
  <T extends z.ZodTypeAny>(t: T) =>
  (init: z.infer<T>) => {
    const [value, setValueRaw] = useState<z.infer<T>>(() => t.parse(init));
    const setValue = (v: z.infer<T>) => setValueRaw(t.parse(v));
    return [value, setValue] as const;
  };
