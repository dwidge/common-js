// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useState, useEffect, useMemo } from "react";
import tinyuid from "tiny-uid";
import { Vertical } from "@dwidge/react-lib/Flex";
import { styled } from "styled-components";

export function FileChooser({
  onChange,
}: {
  value?: File;
  onChange: (v?: File) => void;
}) {
  const id = useMemo(() => tinyuid(), []);
  return (
    <Vertical>
      <label htmlFor={id}>
        <Input
          id={id}
          name={id}
          type="file"
          onChange={(event) => {
            onChange(event.target.files?.[0]);
          }}
        />
      </label>
    </Vertical>
  );
}

const Input = styled.input`
  flex: auto;
  width: 100%;
  display: flex;

  ::file-selector-button {
    flex: auto;
    color: black;
    background: silver;
    padding: 1em;
    border: thin solid silver;
    border-radius: 3px;
    box-shadow: 0px 1px 2px 0px #0005;
    margin: 2px;
    margin-right: 1em;
  }
`;

export function BlobChooser({
  onChange,
}: {
  value?: Blob;
  onChange: (v?: Blob) => void;
}) {
  return (
    <FileChooser
      value={undefined}
      onChange={(file) =>
        onChange(file ? new Blob([file], { type: file.type }) : undefined)
      }
    />
  );
}

export function ImageChooser({
  value,
  onChange,
  ...opts
}: {
  value?: Blob;
  onChange: (v?: Blob) => void;
}) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else setPreview("");
  }, [value]);

  return (
    <Vertical>
      <BlobChooser value={value} onChange={onChange} />
      {preview && <img style={{ width: "100%" }} src={preview} {...opts} />}
    </Vertical>
  );
}
