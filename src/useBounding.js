// useBounding 1.0
// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useRef } from "react";

const useBoundingClientRect = () => {
  const ref = useRef();
  const { width, height, top, left } =
    ref.current?.getBoundingClientRect() || {};
  const min = width && height ? Math.min(width, height) : undefined;
  return [ref, { width, height, top, left, min }];
};

export default useBoundingClientRect;
