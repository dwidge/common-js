// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import PanZoom from "@dwidge/mindmap/PanZoom";
import { Aspect } from "@dwidge/mindmap/Aspect";

export function Zoomy({
  a = 2,
  zoom = 2,
  children,
}: React.PropsWithChildren<{ a?: number; zoom?: number }>) {
  return (
    <Aspect a={a}>
      <PanZoom autoCenterZoomLevel={zoom}>{children}</PanZoom>
    </Aspect>
  );
}
