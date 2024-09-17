// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { makeApi, makeEndpoint } from "@zodios/core";
import { z, string } from "zod";
import { errors } from "./errors.js";

const promptAI = makeEndpoint({
  method: "post",
  path: "/",
  alias: "promptAI",
  description: "Send prompt to AI",
  parameters: [
    {
      name: "body",
      type: "Body",
      schema: z.object({
        prompt: z.string(),
        model: z.enum(["gpt-3.5-turbo", "gpt-4"]),
      }),
    },
  ],
  response: string(),
  errors,
});

export const aiApi = makeApi([promptAI]);
