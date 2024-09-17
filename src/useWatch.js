// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useEffect } from "react";

export function useWatch(v, name = "watch") {
  useEffect(() => {
    console.log(name, v);
  }, [v, name]);
}
