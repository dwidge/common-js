// Examples

// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { expect } from "expect";
import { login } from "../../requesters/login.js";
import { config } from "../../../lib/config/config.js";
import { makeApiClient } from "@dwidge/api";
import { makeId } from "@dwidge/api";
import { MetaItem, MetaItemMini } from "@dwidge/api";

const apiClient = makeApiClient(config.api.host);

export async function testMetaApiCRUD() {
  const authorization = await login();

  const max1 = {
    id: makeId(),
    title: "test",
    type: "test",
    data: '["test"]',
    ChildMetaItems: [],
    ParentMetaItems: [],
  } satisfies MetaItem;
  MetaItem.parse(max1);
  const min1 = MetaItemMini.parse(max1);
  const min1min = MetaItemMini.pick({
    id: true,
    title: true,
    type: true,
  }).parse(max1);

  await expect(
    apiClient.getMeta({
      params: { id: max1.id },
    })
  ).rejects.toMatchObject({ response: { status: 401 } });
  await expect(
    apiClient.updateMeta(max1, {
      params: { id: max1.id },
    })
  ).rejects.toMatchObject({ response: { status: 401 } });
  await expect(
    apiClient.deleteMeta(undefined, {
      params: { id: max1.id },
    })
  ).rejects.toMatchObject({ response: { status: 401 } });
  await expect(
    apiClient.updateMeta(max1, {
      params: { id: max1.id },
      headers: { authorization },
    })
  ).resolves.toMatchObject(min1);
  await expect(
    apiClient.getMetas({
      headers: { authorization },
    })
  ).resolves.toMatchObject(expect.arrayContaining([min1]));
  await expect(
    apiClient.getMeta({
      params: { id: max1.id },
      headers: { authorization },
    })
  ).resolves.toMatchObject(max1);
  await expect(
    apiClient.getMeta({
      params: { id: "invalid0" },
      headers: { authorization },
    })
  ).rejects.toMatchObject({ response: { status: 404 } });
  await expect(
    apiClient.deleteMetas([{ id: max1.id }], {
      headers: { authorization },
    })
  ).resolves.toMatchObject([min1min]);
  await expect(
    apiClient.getMetas({
      headers: { authorization },
    })
  ).resolves.toMatchObject(expect.not.arrayContaining([min1]));
  await expect(
    apiClient.getMeta({
      params: { id: max1.id },
      headers: { authorization },
    })
  ).rejects.toMatchObject({ response: { status: 404 } });
  await expect(
    apiClient.deleteMeta(undefined, {
      params: { id: max1.id },
      headers: { authorization },
    })
  ).rejects.toMatchObject({ response: { status: 404 } });
}

export async function testMetaApiRecursive() {
  const authorization = await login();

  const max1 = {
    id: makeId(),
    title: "test1",
    type: "test1",
    data: '["test1"]',
    ChildMetaItems: [],
    ParentMetaItems: [],
  } satisfies MetaItem;
  MetaItem.parse(max1);
  const min1 = MetaItemMini.parse(max1);

  const max2 = {
    id: makeId(),
    title: "test2",
    type: "test2",
    data: '["test2"]',
    ChildMetaItems: [],
    ParentMetaItems: [],
  } satisfies MetaItem;
  MetaItem.parse(max2);
  const min2 = MetaItemMini.parse(max2);

  await expect(
    apiClient.updateMetas([max1, max2], {
      headers: { authorization },
    })
  ).resolves.toMatchObject([min1, min2]);
  await expect(
    apiClient.getMetas({
      headers: { authorization },
    })
  ).resolves.toMatchObject(expect.arrayContaining([min1, min2]));

  await expect(
    apiClient.updateMetas(
      [
        { ...max1, ChildMetaItems: [{ id: max2.id }] },
        { ...max2, ParentMetaItems: [{ id: max1.id }] },
      ],
      {
        headers: { authorization },
      }
    )
  ).resolves.toMatchObject([
    { ...min1, ChildMetaItems: [{ id: max2.id }] },
    { ...min2, ParentMetaItems: [{ id: max1.id }] },
  ]);
  await expect(
    apiClient.getMetas({
      headers: { authorization },
    })
  ).resolves.toMatchObject(
    expect.arrayContaining([
      { ...min1, ChildMetaItems: [{ id: max2.id }] },
      { ...min2, ParentMetaItems: [{ id: max1.id }] },
    ])
  );

  await expect(
    apiClient.deleteMeta(undefined, {
      params: { id: min2.id },
      headers: { authorization },
    })
  ).resolves.toStrictEqual({ ...min2, ParentMetaItems: [{ id: max1.id }] });
  await expect(
    apiClient.getMetas({
      headers: { authorization },
    })
  ).resolves.toMatchObject(expect.arrayContaining([min1]));
}
