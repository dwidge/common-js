// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { logError } from "./logError.js";

export async function runSeeders(sequelize, seeds) {
  for (const [key, model] of Object.entries(seeds)) {
    try {
      const created = await model.up(
        sequelize.getQueryInterface(),
        sequelize.constructor
      );
      console.log(`seed ${key} ${created?.length ?? "?"}`);
    } catch (e) {
      console.log(`seed ${key} - error`);
      logError(e);
    }
  }
}
