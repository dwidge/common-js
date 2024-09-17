// Examples

// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { MetaItem } from "@dwidge/types";
import PromiseRouter from "express-promise-router";
import { MetaItemTable } from "../../models/index.js";
import { metaApi } from "@dwidge/api";
import { dropUndefined } from "@dwidge/api";
import { authToken } from "../../utils/authToken.js";
import { zodiosRouter } from "@zodios/express";
import { validationErrorHandler } from "../../utils/validation.js";
import assert from "assert";
import { NotFoundError } from "../../utils/Error.js";
import z from "zod";
import { sequelize } from "../../models/sequelize.js";

export const metaRouter = zodiosRouter(metaApi, {
  router: PromiseRouter(),
  validationErrorHandler,
});

const findMetaItems = z
  .function()
  .args(MetaItem.partial().array())
  .returns(
    MetaItem.pick({ id: true, title: true, type: true }).array().promise()
  )
  .strictImplement(async (where) => {
    const records = await MetaItemTable.findAll({
      where: where.map(dropUndefined),
      attributes: ["id", "title", "type"],
      include,
    });
    return records.map((v) => v.toJSON());
  });

const updateMetaItems = z
  .function()
  .args(
    z.object({
      rows: MetaItem.array(),
    })
  )
  .returns(MetaItem.array().promise())
  .strictImplement(async ({ rows }) => {
    const transaction = await sequelize.transaction();
    try {
      const records = await Promise.all(
        rows.map(async (row) => {
          const [record] = await MetaItemTable.upsert(row, { transaction });
          if (row.ChildMetaItems)
            // @ts-expect-error
            await record.setChildMetaItems(
              row.ChildMetaItems.map((r) => r.id),
              {
                transaction,
              }
            );
          if (row.ParentMetaItems)
            // @ts-expect-error
            await record.setParentMetaItems(
              row.ParentMetaItems.map((r) => r.id),
              {
                transaction,
              }
            );
          return { ...row, ...record.toJSON() };
        })
      );
      await transaction.commit();
      return records;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  });

const include = [
  {
    model: MetaItemTable,
    foreignKey: "childId",
    as: "ParentMetaItems",
    attributes: ["id"],
    through: { attributes: [] },
  },
  {
    model: MetaItemTable,
    foreignKey: "parentId",
    as: "ChildMetaItems",
    attributes: ["id"],
    through: { attributes: ["order"] },
  },
];
const attributes = ["id", "title", "type"];

metaRouter.get("/", async (req, res) => {
  authToken(req.headers.authorization);
  const records = (
    await MetaItemTable.findAll({
      where: [req.query].map(dropUndefined),
      attributes,
      include,
    })
  ).map((v) => v.toJSON());
  res.json(records);
});

metaRouter.get("/:id", async (req, res) => {
  authToken(req.headers.authorization);
  const record = (
    await MetaItemTable.findOne({
      where: { id: req.params.id },
      include,
    })
  )?.toJSON();
  assert(record, new NotFoundError("metaRouter_getId1"));
  res.json(record);
});

metaRouter.put("/", async (req, res) => {
  authToken(req.headers.authorization);
  const records = await updateMetaItems({ rows: req.body });
  res.json(records);
});

metaRouter.put("/:id", async (req, res) => {
  authToken(req.headers.authorization);
  const [record] = await updateMetaItems({ rows: [req.body] });
  assert(record, new NotFoundError("metaRouter_putId1"));
  res.json(record);
});

metaRouter.delete("/", async (req, res) => {
  authToken(req.headers.authorization);
  const records = await findMetaItems(req.body);
  const count = await MetaItemTable.destroy({
    where: { id: records.map((r) => r.id) },
  });
  assert(count === records.length, "metaRouter_delete1");
  res.json(records);
});

metaRouter.delete("/:id", async (req, res) => {
  authToken(req.headers.authorization);
  const record = (
    await MetaItemTable.findOne({
      where: { id: req.params.id },
      include,
    })
  )?.toJSON();
  assert(record, new NotFoundError("metaRouter_deleteId1"));
  const count = await MetaItemTable.destroy({
    where: { id: req.params.id },
  });
  assert(count === 1, "metaRouter_deleteId2");
  res.json(record);
});
