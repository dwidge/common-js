// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { format, fromUnixTime } from "date-fns";

export const formatMS = (ms) =>
  format(fromUnixTime(ms / 1000), "yyyy/MM/dd HH:mm");
