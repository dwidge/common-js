// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useState } from "react";
import { Stack } from "@mui/material";
import { ocrImages } from "./ocrImages";

export const OcrPage = ({}: {}) => {
  const [text, setText] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  return (
    <Stack>
      <h1>Ocr</h1>
      <h2>Image</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as typeof e.target & { file: HTMLInputElement };
          if (form.file.files) {
            setLoading(true);
            ocrImages([...form.file.files])
              .then(setText)
              .catch(setError)
              .finally(() => setLoading(false));
          }
        }}
      >
        <input name="file" type="file" />
        <button type="submit">Convert</button>
      </form>
      <h2>Text</h2>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      <div>
        {text.map((s, i) => (
          <pre key={i}>{s}</pre>
        ))}
      </div>
    </Stack>
  );
};
