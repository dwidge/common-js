// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { cleanTrace } from "../../lib/error/cleanTrace.js";
import { SequelizeError, FatalError } from "./Error.js";
import { Error } from "sequelize";

function logError(e) {
  e.stack = cleanTrace(e.stack);

  if (e instanceof Error) {
    console.log(`${e.name}: ${e.original?.message ?? e.message}`);
    console.log(e.original?.sql ?? e.sql);
    console.log(e.stack);
  } else console.log(e);
}

const catchError = (e) => {
  logError(e);
  if (e instanceof Error) throw new SequelizeError(e);
  throw new FatalError(e);
};

const catchSequelizeError = (code, model, value) => async (e) => {
  logError(e);
  if (e.name === "SequelizeForeignKeyConstraintError") {
    console.log(
      Object.fromEntries(
        await Promise.all(
          Object.entries(model.associations).map(async ([k, v]) => [
            v.identifierField,
            {
              value: value[v.identifierField],
              found: (
                await v.target.findByPk(value[v.identifierField])
              )?.get({ plain: true }),
              all: (await v.target.findAll({ limit: 30 })).map((v) => v.id),
            },
          ])
        )
      )
    );
  }

  throw new SequelizeError(code, e);
};

export { logError, catchError, catchSequelizeError };
