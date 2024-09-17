// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { GenericError as NewGenericError } from "../../lib/error/GenericError.js";
import { error } from "../../lib/error/messages.js";

class GenericError extends NewGenericError {
  constructor(message = "", { code = "", ...props } = {}) {
    super(code, { message, ...props });
  }
}
class FatalError extends GenericError {
  constructor({ stack = undefined } = {}) {
    super(error.fatalError, {
      name: "FatalError",
      status: 500,
      stack,
    });
  }
}

class SequelizeError extends GenericError {
  constructor(code = "", { stack = undefined } = {}) {
    super(error.fatalError, {
      name: "SequelizeError",
      status: 500,
      stack,
      code,
    });
  }
}

class NotAuthorizedError extends GenericError {
  constructor(code = "", { stack = undefined } = {}) {
    super(error.notAuthorized, {
      name: "NotAuthorizedError",
      status: 401,
      code,
      stack,
    });
  }
}
class InvalidBodyError extends GenericError {
  constructor(code = "InvalidBodyError1", message = error.invalidBody) {
    super(message, {
      name: "InvalidBodyError",
      status: 422,
      code,
    });
  }
}
class IncorrectLoginDetailsError extends GenericError {
  constructor(code, cause = undefined) {
    super(error.incorrectLoginDetails, {
      code,
      name: "IncorrectLoginDetailsError",
      status: 403,
    });
  }
}

export { NotFoundError } from "../../lib/error/Error.js";

export {
  GenericError,
  FatalError,
  SequelizeError,
  NotAuthorizedError,
  InvalidBodyError,
  IncorrectLoginDetailsError,
};
