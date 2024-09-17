// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { User } from "@dwidge/types";
import { User as UserTable } from "../../models/index.js";
import { encryptPassword } from "../../utils/encrypt.js";

import { NotFoundError } from "../../utils/Error.js";
import { catchSequelizeError } from "../../utils/logError.js";

export const safeloadUser = ({ password, ...user }: User): User => user;

export const safesaveUser = async (user: User): Promise<User> => ({
  ...user,
  password: user.password
    ? await encryptPassword(user.password)
    : user.password,
});

export async function getUsers(where?: { id?: string | number }) {
  const instances = await UserTable.findAll({ where }).catch(
    catchSequelizeError("getUsersE1")
  );
  return instances.map((d) => d.toJSON());
}

export async function getUser(id: string | number) {
  const instance = await UserTable.findOne({
    where: {
      id,
    },
  }).catch(catchSequelizeError("getUserE1"));
  if (!instance) throw new NotFoundError("getUserE2");
  return instance.toJSON();
}

export async function deleteUser(id: string | number) {
  const instance = await getUser(id);
  const changed = await UserTable.destroy({
    where: {
      id,
    },
  }).catch(catchSequelizeError("deleteUserE1"));
  if (changed !== 1) throw new NotFoundError("deleteUserE2");
  return instance;
}

export const updateUser = (v: User) =>
  UserTable.upsert(v)
    .catch(catchSequelizeError("updateUserE1"))
    .then(([v]) => v.toJSON());

export const createUser = (v: User) =>
  UserTable.upsert(v)
    .catch(catchSequelizeError("createUserE1"))
    .then(([v]) => v.toJSON());

export const createUsers = (many: User[]) =>
  UserTable.bulkCreate(many)
    .catch(catchSequelizeError("createUsersE1"))
    .then((v) => v.map((d) => d.toJSON()));
