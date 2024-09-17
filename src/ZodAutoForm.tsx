// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import ZodBridge from "uniforms-bridge-zod";
import { AutoForm } from "uniforms-mui";
import { convertNullableToOptional } from "./convertNullableToOptional.js";
import { ZodObject, ZodRawShape, z } from "zod";

export const ZodAutoForm = <Z extends ZodObject<ZodRawShape>>({
  schema,
  value,
  onSubmit,
  onChange,
}: {
  schema: Z;
  value?: z.input<Z>;
  onSubmit?: (v: z.output<Z>) => void;
  onChange?: (v: z.output<Z>) => void;
}) => (
  <AutoForm
    schema={
      new ZodBridge({
        schema: convertNullableToOptional(schema),
      })
    }
    showInlineError
    submitField={onSubmit ? undefined : () => <></>}
    errorsField={() => <></>}
    model={value}
    onSubmit={onSubmit}
    onChangeModel={onChange}
  />
);
