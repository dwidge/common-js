// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Sequelize, DataTypes, Model } from "sequelize";
import { File2Db, File2DbCreate } from "@dwidge/types";

export interface File2Instance extends Model<File2Db, File2DbCreate>, File2Db {}

export class File2Model extends Model<File2Db, File2DbCreate> {
  static initialize(sequelize: Sequelize) {
    return File2Model.init(
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        created: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdBy: {
          type: DataTypes.INTEGER,
        },
        companyId: {
          type: DataTypes.INTEGER,
        },
        key: {
          type: DataTypes.STRING(255),
        },
        size: {
          type: DataTypes.INTEGER,
        },
        mime: {
          type: DataTypes.STRING(255),
        },
        sha256: {
          type: DataTypes.STRING(64),
        },
      },
      {
        sequelize,
        modelName: "File",
        timestamps: false,
      }
    );
  }

  static associate(models: any) {}
}

export default File2Model.initialize;
