// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useState } from "react";
import { getMessage } from "src/utils/getMessage";
import { apiHooks } from "src/utils/apiHooks";
import { useUser } from "src/utils/useUser.ts";
import { Body, Message } from "src/utils/components/Page.tsx";
import { TextField } from "@dwidge/form-fields/TextField";
import { Button } from "@mui/material";
import { SelectField } from "@dwidge/form-fields/SelectField";

export const allowed = (user: { token: string }) => user.token;

type modelTypes = "gpt-3.5-turbo" | "gpt-4";
const models = new Map<
  modelTypes,
  {
    info: string;
    maxTokens: number;
    dollarsPerPromptToken: number;
    dollarsPerSampledToken: number;
  }
>([
  [
    "gpt-3.5-turbo",
    {
      maxTokens: 4096,
      dollarsPerPromptToken: 0,
      dollarsPerSampledToken: 0,
      info: "OpenAI\nGPT-3.5 models can understand and generate natural language or code. Our most capable and cost effective model in the GPT-3.5 family is gpt-3.5-turbo which has been optimized for chat but works well for traditional completions tasks as well.",
    },
  ],
  [
    "gpt-4",
    {
      maxTokens: 8192,
      dollarsPerPromptToken: 0.03 * 1000,
      dollarsPerSampledToken: 0.06 * 1000,
      info: "OpenAI\nFor many basic tasks, the difference between GPT-4 and GPT-3.5 models is not significant. However, in more complex reasoning situations, GPT-4 is much more capable than any of our previous models.",
    },
  ],
]);

export function AiPage() {
  const [model, setModel] = useState<modelTypes>("gpt-4");
  const [prompt, setPrompt] = useState("");

  const { token } = useUser();
  const m = apiHooks.usePromptAI({
    headers: { Authorization: "Bearer " + token },
  });
  return (
    <>
      <Body>
        <SelectField
          items={Array.from(models.keys())}
          value={model}
          onChange={(s) => setModel(s as modelTypes)}
        />
        <div style={{ whiteSpace: "pre-wrap" }}>{models.get(model)?.info}</div>
        <TextField
          label="Prompt"
          multiline
          rows={10}
          value={prompt}
          onChange={setPrompt}
        />
        <Button onClick={() => m.mutate({ prompt, model })}>Send</Button>
        <Message>
          {getMessage("Loading...", "Loaded successfluffy!", m)}
        </Message>
        <div style={{ whiteSpace: "pre-wrap" }}>{prompt}</div>
        <div style={{ whiteSpace: "pre-wrap" }}>{m.data}</div>
      </Body>
    </>
  );
}
