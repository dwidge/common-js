// Examples

// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import "./ItemsView.css";
import React, { useEffect, useState } from "react";
import { Json } from "./Json";
import { useItems } from "@dwidge/api-hooks";

export function ItemsView({}) {
  const { data, create, destroy, error, isLoading } = useItems();
  const [selected, setSelected] = useState();
  const [tags, setTags] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <div>
        <label>Tags</label>
        <input
          id="tags"
          defaultValue={tags}
          onChange={(e) => setTags(e.target.value.split(" ").filter((s) => s))}
        />
      </div>
      {isLoading && <div>Loading items...</div>}
      {error && <div>{error.toString()}</div>}
      {data
        ?.filter((value) =>
          tags.every((requiredTag) =>
            value.tags.some((tag) => tag.includes(requiredTag))
          )
        )
        .map((value, i) => (
          <div
            key={value.id + i}
            style={{ padding: "1em", background: "grey" }}
          >
            {value.id === selected ? (
              <ItemForm
                value={[
                  data?.find(({ id }) => id === selected),
                  (v) => {
                    create([v]);
                    console.log("ItemForm1", v);
                    setSelected();
                  },
                ]}
              />
            ) : (
              <>
                <button onClick={() => setSelected(value.id)}>Edit</button>
                <button onClick={() => destroy([value])}>Delete</button>
                <Json {...{ value }} />
              </>
            )}
          </div>
        ))}
    </div>
  );
}

export function ItemForm({ value: [value = {}, setValue] }) {
  const { id = "test_id", ItemId = "", components = [], tags = [] } = value;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setValue({
          ...value,
          id: e.target.id.value,
          ItemId: e.target.ItemId.value,
          components: JSON.parse(e.target.components.value),
          tags: e.target.tags.value.split(" "),
        });
      }}
    >
      <div>
        <input type="submit" value="Save" />
      </div>
      <div>
        <label>Id</label>
        <input id="id" defaultValue={id} />
      </div>
      <div>
        <label>ItemId</label>
        <input id="ItemId" defaultValue={ItemId} />
      </div>
      <div>
        <label>Components</label>
        <textarea
          id="components"
          defaultValue={JSON.stringify(components, null, 2)}
          rows={20}
        />
      </div>
      <div>
        <label>tags</label>
        <input id="tags" defaultValue={tags.join(" ")} />
      </div>
      <div>
        <input type="submit" value="Save" />
      </div>
    </form>
  );
}
