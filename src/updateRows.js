// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { dataKeys } from "../seeders/dataKeys.js";
import { catchSequelizeError } from "./logError.js";

export const updateRows = async (model, rows, where, create) => {
  const existing = await model
    .findAll({
      where,
      attributes: ["id"],
      raw: true,
      nest: true,
    })
    .catch(catchSequelizeError("updateRows1"));
  const missing = existing.filter(({ id }) => !rows.some((l) => l.id === id));
  await model
    .destroy({
      where: { id: missing.map(({ id }) => id) },
    })
    .catch(catchSequelizeError("updateRows2"));

  if (create) {
    return await Promise.all(rows.map(create));
  } else {
    await model
      .bulkCreate(
        rows.map((row) => ({ ...row, ...where })),
        {
          updateOnDuplicate: dataKeys(model),
        }
      )
      .catch(catchSequelizeError("updateRows3"));
    return rows.map((row) => ({ ...row, ...where }));
  }
};
