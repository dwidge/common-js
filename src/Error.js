// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { GenericError } from "../../lib/error/GenericError.js";
import { FatalError } from "../utils/Error.js";
import { getCode } from "../utils/code.js";

/**
 * Response object with error information.
 * @typedef {Object} ErrorResponse
 * @property {string} code - The error code generated from the error stack.
 * @property {boolean} success - Indicates whether the request was successful or not.
 * @property {string} message - The error message.
 * @property {string} name - The name of the error.
 * @property {number} status - The HTTP status code associated with the error.
 */

function sendError(res, error) {
  return res.status(error.status || 500).json({
    code: error.code,
    success: false,
    message: error.message,
    name: error.name,
    status: error.status,
  });
}

function reportError(error) {
  console.dir(error instanceof ZodError ? fromZodError(error) : error); // yellow
  //console.log("\x1b[33m%s\x1b[0m", error); // yellow
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Catches errors and sends error response.
 *
 * @memberof Routes
 * @returns {Promise<void>}
 */
async function error(err, req, res, next) {
  try {
    if (!(err instanceof GenericError && err.status < 500))
      await reportError(err);
    await sendError(
      res,
      err instanceof GenericError ? err : new FatalError(err)
    );
  } catch (e) {
    console.log(e);
    next(new FatalError());
  }
}

export { error, getCode, sendError, reportError };
