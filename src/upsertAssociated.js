// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// ChatGPT

import { sequelize } from "../models/sequelize.js";

export const upsertAssociated = async (
  Model,
  AssociatedModel,
  id,
  associated
) => {
  const modelName = Model.name;
  const associationName = AssociatedModel.name;

  try {
    const instance = await Model.findByPk(id);
    if (!instance) throw new Error(`${modelName} not found.`);

    await sequelize.transaction(async (t) => {
      await instance[`set${associationName}s`]([], { transaction: t }); // remove all associated models
      await Promise.all(
        associated.map(async (item) => {
          const associatedInstance = await AssociatedModel.findByPk(item.id);
          if (associatedInstance) {
            await instance[`add${associationName}s`](associatedInstance, {
              transaction: t,
            }); // add associated model to instance
          } else console.log(`Does not exist: ${item.id}`);
        })
      );
    });

    if (0) {
      const result = await Model.findByPk(id, {
        include: { model: AssociatedModel, attributes: ["id"] },
      });
      console.log(
        "upsertAssociated",
        modelName,
        id,
        associationName,
        result[`${associationName}s`].map((o) => o.id)
      );
    }
  } catch (err) {
    console.error(err);
    throw new Error(`Something went wrong while upserting ${modelName}.`);
  }
};

export const upsertAssociatedPlain = async (
  Model,
  AssociatedModel,
  id,
  associated
) => {
  const modelName = Model.name;
  const associationName = AssociatedModel.name;

  try {
    const instance = await Model.findByPk(id);
    if (!instance) throw new Error(`${modelName} not found.`);

    await instance[`set${associationName}s`]([]); // remove all associated models
    await Promise.all(
      associated.map(async (item) => {
        const associatedInstance = await AssociatedModel.findByPk(item.id);
        if (associatedInstance) {
          try {
            await instance[`add${associationName}s`](associatedInstance, {}); // add associated model to instance
          } catch (e) {
            if (e.name === "SequelizeUniqueConstraintError")
              console.log(`Already exists: ${id} ${item.id}`);
            else throw e;
          }
        } else console.log(`Does not exist: ${item.id}`);
      })
    );
    if (0) {
      const result = await Model.findByPk(id, {
        include: { model: AssociatedModel, attributes: ["id"] },
      });
      console.log(
        "upsertAssociated",
        modelName,
        id,
        associationName,
        result[`${associationName}s`].map((o) => o.id)
      );
    }
  } catch (err) {
    console.error(err);
    throw new Error(`Something went wrong while upserting ${modelName}.`);
  }
};
