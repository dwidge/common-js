// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { File2Table } from "../../models/index.js";
import { Auth } from "@dwidge/types";
import assert from "node:assert";
import {
  File2,
  File2Key,
  File2Filter,
  File2DbCreate,
  File2Set,
  File2Get,
  File2Db,
} from "@dwidge/types";
import { catchSequelize } from "../../../lib/error/catchError.js";
import { NotAuthorizedError } from "../../utils/Error.js";
import { isSuperRole } from "../../utils/roles.js";
import { unixTimestamp } from "../../utils/unixTimestamp.js";
import { dropUndefined } from "@dwidge/api";
import { randBase32 } from "@dwidge/randid";
import { DbQueryOptions } from "@dwidge/query";
import { storage } from "../../../lib/utils/storage.js";
import { Order } from "sequelize";
import { config } from "../../../lib/config/config.js";
import { z } from "zod";

export async function getFile2List(
  filter: File2Filter,
  auth?: Auth,
  options?: DbQueryOptions
): Promise<{ rows: File2Get[]; count: number; offset: number }> {
  filter = File2Filter.parse(filter);
  auth = Auth.optional().parse(auth);
  const {
    offset = 0,
    limit = 1000,
    order = [],
  } = DbQueryOptions.optional().parse(options) ?? {};
  assert(auth, new NotAuthorizedError("getFile2List1"));

  const dbFilter = File2Db.partial().parse(filter);
  const authFilter = isSuperRole(auth.roleId)
    ? dbFilter
    : { ...dbFilter, companyId: auth.companyId };

  const where = File2Db.partial().parse(
    dropUndefined({ created: true, ...authFilter })
  );

  let attributes = Object.keys(authFilter);
  if (Object.keys(filter).includes("putUrl"))
    attributes = attributes.concat([
      "id",
      "createdAt",
      "createdBy",
      "companyId",
      "size",
      "mime",
      "sha256",
    ]);
  if (Object.keys(filter).includes("getUrl"))
    attributes = attributes.concat(["id", "createdAt", "companyId"]);

  const findcount = await File2Table.findAndCountAll({
    where,
    attributes,
    offset,
    limit,
    order: order as Order,
  }).catch(catchSequelize("getFile2List2"));

  const allowed = findcount.rows
    .map((v) => v.toJSON())
    .filter((file) => canUserReadFile2(file, auth));

  let rows = File2Get.array().parse(allowed);
  if (Object.keys(filter).includes("putUrl"))
    rows = await amendPutUrl(File2PutUrl.array().parse(rows), auth);
  if (Object.keys(filter).includes("getUrl"))
    rows = await amendGetUrl(File2GetUrl.array().parse(rows), auth);

  return { rows: File2Get.array().parse(rows), count: findcount.count, offset };
}

export const setFile2List = (
  items: File2Set[],
  auth?: Auth
): Promise<(File2Key | null)[]> =>
  Promise.all(items.map((item) => setFile2(item, auth)));

export async function setFile2(
  item: File2Set,
  auth?: Auth
): Promise<File2Key | null> {
  item = File2Set.parse(item);
  auth = Auth.optional().parse(auth);

  if (!auth) throw new NotAuthorizedError("");

  if (item.id != null) {
    const one = (
      await File2Table.findOne({
        where: { id: item.id },
      }).catch(catchSequelize("setFile21"))
    )?.toJSON();

    if (one && !canUserWriteFile2(one, auth))
      throw new NotAuthorizedError("setFile22");
  }

  const defaults = {
    id: randBase32(),
    companyId: auth?.companyId,
    created: true,
    ...item,
    createdAt: unixTimestamp(),
    createdBy: auth?.userId,
  };
  const write = File2DbCreate.parse(defaults);

  // write = await amendKey(write, auth);

  if (!canUserWriteFile2(write, auth))
    throw new NotAuthorizedError("setFile25");

  const [result] = await File2Table.upsert(write).catch(
    catchSequelize("setFile26")
  );
  assert(result, "setFile27");

  const key = File2Key.parse(result.toJSON());
  assert.equal(key.id, defaults.id, "setFile28");

  const check = await getFile2List({ id: key.id, created: undefined }, auth);
  assert.equal(check.rows.length, 1, "setFile29");

  return key;
}

export const canUserReadFile2 = (
  item: Pick<Partial<File2>, "companyId">,
  auth?: Auth
): boolean =>
  !!auth && (isSuperRole(auth.roleId) || auth.companyId === item.companyId);

export const canUserWriteFile2 = (
  item: Pick<Partial<File2>, "companyId">,
  auth?: Auth
): boolean =>
  !!auth &&
  (isSuperRole(auth.roleId) ||
    (item.companyId !== null && auth.companyId === item.companyId));

const File2PutUrl = File2Get.required({
  id: true,
  createdAt: true,
  createdBy: true,
  companyId: true,
  size: true,
  mime: true,
  sha256: true,
});
type File2PutUrl = z.infer<typeof File2PutUrl>;

const amendPutUrl = async (
  rows: File2PutUrl[],
  auth: Auth
): Promise<File2PutUrl[]> =>
  Promise.all(
    rows.map(async (r) => ({ ...r, putUrl: await makePutUrl(r, auth) }))
  );

const File2GetUrl = File2Get.required({
  id: true,
  createdAt: true,
  companyId: true,
  size: true,
  mime: true,
  sha256: true,
});
type File2GetUrl = z.infer<typeof File2GetUrl>;

const amendGetUrl = async (
  rows: File2GetUrl[],
  auth: Auth
): Promise<File2GetUrl[]> =>
  Promise.all(
    rows.map(async (r) => ({ ...r, getUrl: await makeGetUrl(r, auth) }))
  );

const makePutUrl = async (r: File2PutUrl, auth: Auth) =>
  auth.userId === r.createdBy && r.size && r.mime && r.sha256
    ? (
        await storage.putSignedUrl(makeFile2Key(r), {
          size: r.size,
          mime: r.mime,
          sha256: r.sha256,
          access: "private",
          expires: 3600,
        })
      ).url
    : null;

const makeGetUrl = async (r: File2GetUrl, _auth: Auth) =>
  r.size && r.mime && r.sha256
    ? await storage.getSignedUrl(makeFile2Key(r), {
        expires: 3600,
      })
    : null;

const makeFile2Key = (
  row: PickRequired<File2Get, "id" | "createdAt" | "companyId">
) =>
  config.storage.baseKey +
  "/" +
  (row.companyId ?? "public") +
  "/file/" +
  row.id +
  "_" +
  row.createdAt;

export type PickRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
