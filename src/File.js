// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import Router from "express-promise-router";
import { zodiosRouter } from "@zodios/express";
import { validationErrorHandler } from "../utils/validation.js";
import { blockRole } from "./Auth.js";
import { roles } from "../utils/roles.js";

import { fileApi } from "./File.api.js";
import {
  getList,
  readStream,
  writeStream,
  mkdir,
  rmdir,
  rmfile,
} from "../utils/stream.js";
import { string, object, array } from "zod";
import { config } from "../../lib/config/config.js";

const filesPath = config.storage.path.files;

const filename = (p) =>
  string(p)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .default("");

export const fileRouter = zodiosRouter(fileApi, {
  router: Router().use(blockRole(roles.Anon)),
  validationErrorHandler,
});

fileRouter.get("/", async (req, res) => {
  const fileList = await listItemFiles("");
  res.send(fileList);
});

fileRouter.delete("/:id", async (req, res) => {
  const { id } = object({
    id: filename(),
  }).parse(req.params);
  await rmItemDir(id);
  res.sendStatus(200);
});

fileRouter.get("/:id", async (req, res) => {
  const { id } = object({
    id: filename(),
  }).parse(req.params);
  const fileList = await listItemFiles(id);
  res.send(fileList);
});

fileRouter.get("/:id/:name", async (req, res) => {
  const { id, name } = object({
    id: filename(),
    name: filename(),
  }).parse(req.params);
  const fileStream = await loadItemFile(id, name);
  fileStream.pipe(res);
});

fileRouter.put("/:id", async (req, res) => {
  const { id } = object({
    id: filename(),
  }).parse(req.params);
  const files = array(
    object({
      fieldname: filename(),
      path: string(),
    })
  ).parse(req.files);

  await Promise.all(
    files.map(async ({ fieldname, path }) => {
      const fileStream = await readStream(path);
      await saveItemFile(fileStream, id, fieldname);
    })
  );
  const onDisk = await getList(`${filesPath}/${id}`, { recursive: false });
  console.log({ onDisk });
  await Promise.all(
    onDisk.map(async (filename) => {
      const isPut = files.some(({ fieldname }) => fieldname === filename);
      if (!isPut) {
        await delItemFile(id, filename);
      }
    })
  );
  res.sendStatus(200);
});

const makeItemDir = (id) => mkdir(`${filesPath}/${id}`);
const rmItemDir = (id) =>
  rmdir(`${filesPath}/${id}`, { recursive: true, force: true });
const listItemFiles = (id) => getList(`${filesPath}/${id}`);
const delItemFile = (id, name) => rmfile(`${filesPath}/${id}/${name}`);
export const loadItemFile = (id, name) =>
  readStream(`${filesPath}/${id}/${name}`);
const saveItemFile = (fileStream, id, name) =>
  mkdir(dropLast(`${filesPath}/${id}/${name}`), { recursive: true }).then(() =>
    writeStream(fileStream, `${filesPath}/${id}/${name}`)
  );

const dropLast = (s = "", del = "/") => s.split(del).slice(0, -1).join(del);
