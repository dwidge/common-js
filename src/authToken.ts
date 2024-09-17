// Examples

// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Auth, AuthUser } from "@dwidge/types";
import { NotAuthorizedError } from "./Error.js";
import { signAccess, verifyToken } from "./encrypt.js";
import assert from "assert";

export function authToken(authorization?: string) {
  if (!authorization) throw new NotAuthorizedError("authTokenE1");
  const [bearer, token = bearer] = authorization.split(" ");
  return AuthUser.parse(verifyToken(token));
}

export function authTokenOptional(authorization?: string) {
  if (!authorization) return;
  const [bearer, token = bearer] = authorization.split(" ");
  return AuthUser.parse(verifyToken(token));
}

const authFromAuthUser = (authUser?: AuthUser): Auth | undefined =>
  Auth.optional().parse(
    authUser && {
      companyId: "examplexxxxxx",
      userId: authUser.uid,
      roleId: authUser.roleId,
    }
  );

export const authFromToken = (authorization?: string) =>
  authFromAuthUser(authTokenOptional(authorization));

export function generateToken(claims: AuthUser) {
  const token = signAccess(AuthUser.parse(claims));
  assert(token, "generateTokenE1");
  return token;
}
