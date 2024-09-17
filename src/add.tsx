// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useState, useEffect } from "react";
import useEndpoint from "src/utils/useEndpoint";
import { Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { TextField } from "@dwidge/form-fields/TextField";
import { Alerts, Msg } from "src/utils/components/Alerts";
import tinyuid from "tiny-uid";
import { ListField } from "@dwidge/form-fields/ListField";
import { ImageChooser } from "src/utils/components/ImageChooser";

type Image = { id: string; name: string; blob?: Blob };
type ImageAsset = {
  id: string;
  images: Image[];
};

export default function EditAsset() {
  let { id = tinyuid() } = useParams();
  const [value, onChange] = useState<ImageAsset>({
    id,
    images: [],
  });
  const [msgs, setMsg] = useState<Msg[]>([]);

  const api = useEndpoint();

  useEffect(() => {
    setMsg([["info", "Fetching..."]]);
    api({ url: "/file/" + id, method: "get" })
      .then(async (list: string[]) =>
        onChange({
          id,
          images: await Promise.all(
            list.map(async (name: string) => ({
              id: name,
              name,
              blob: await fetchFile(id, name),
            }))
          ),
        })
      )
      .then(() => setMsg([["success", "Fetched"]]))
      .catch(() => setMsg([["error", "Failed"]]));
  }, [id, api]);

  const validate = async () => {
    if (!value.images.every(({ blob }) => blob))
      throw new Error("Missing file");
  };

  const submit = () =>
    validate()
      .then(() =>
        uploadFiles(
          value.id,
          Object.fromEntries(value.images.map(({ name, blob }) => [name, blob]))
        )
      )
      .then(() => setMsg([["success", "Uploaded."]]))
      .catch((e) => setMsg([["error", e.message]]));

  const uploadFiles = (id: string, data: { [name: string]: Blob }) => {
    setMsg([["info", "Uploading..."]]);
    return api({
      url: "/file/" + id,
      method: "put",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const fetchFile = async (id: string, name: string) => {
    setMsg([["info", "Fetching..."]]);
    const data: Blob = await api({
      url: "/file/" + id + "/" + name,
      method: "get",
      responseType: "blob",
    }).catch((e) => {
      setMsg([["error", e.message]]);
      throw e;
    });
    setMsg([["success", "Fetched."]]);
    return data;
  };

  if (!value) return <h1>No asset</h1>;
  return (
    <Stack gap={2}>
      <TextField
        label="Group"
        value={value.id}
        onChange={(id) => onChange({ ...value, id })}
      />
      <ListField
        {...{
          label: "Images",
          value: value.images,
          onChange: (images: Image[]) => onChange({ ...value, images }),
          defaultValue: (): Image => ({
            id: tinyuid(),
            name: "img" + (value.images.length + 1),
            blob: undefined,
          }),
        }}
      >
        {ImageUpload}
      </ListField>
      <Button variant="contained" onClick={submit}>
        Submit
      </Button>
      <Alerts msgs={msgs} />
    </Stack>
  );
}

function ImageUpload({
  value,
  onChange,
}: {
  value: Image;
  onChange: (m: Image) => void;
}) {
  return (
    <Stack gap={2}>
      <TextField
        label="Name"
        value={value.name}
        onChange={(name) => onChange({ ...value, name })}
      />
      <ImageChooser
        value={value.blob}
        onChange={(blob) => onChange({ ...value, blob })}
      />
    </Stack>
  );
}
