// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import jwt_decode from "jwt-decode";
import { Auth, AuthUser } from "@dwidge/types";

export const getAuthUserFromToken = (token?: string): AuthUser | undefined =>
  token ? AuthUser.parse(jwt_decode(token)) : undefined;

export const getAuthFromAuthUser = (authUser?: AuthUser): Auth | undefined =>
  Auth.optional().parse(
    authUser && {
      companyId: "examplexxxxxx",
      userId: authUser.uid,
      roleId: authUser.roleId,
    }
  );

export const getAuthFromToken = (token?: string) =>
  getAuthFromAuthUser(getAuthUserFromToken(token));
