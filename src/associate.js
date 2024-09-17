// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const associateSequelizeModels = (Models) =>
  Object.entries(Models).map(([key, model]) => {
    if (model.associate) model.associate(Models);
    return [key, model];
  });
