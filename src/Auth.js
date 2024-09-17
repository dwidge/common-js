// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { authToken } from "../utils/authToken.js";

/** @namespace Routes */

export async function auth(req, res, next) {
  const { body, headers } = req;
  const token = headers.authorization ?? headers.token ?? body.token;
  req.auth = token ? await authToken(token) : {};
  next();
}

/**
 * Authenticates a route.
 *
 * @memberof Routes
 * @param {Array} allowedRoles Role ids authorized to use this endpoint.
 * @returns {Function}
 */
export function allowRole(...allowedRoles) {
  return async function (req, res, next) {
    if (!allowedRoles.includes(req.auth?.roleId))
      res.status(401).send("Not Authorized");
    else next();
  };
}

export function blockRole(...blockedRoles) {
  return async function (req, res, next) {
    if (blockedRoles.includes(req.auth?.roleId))
      res.status(401).send("Not Authorized");
    else next();
  };
}
