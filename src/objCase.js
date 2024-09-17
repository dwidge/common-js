// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const mapKeysDeep = require("map-keys-deep/fp");
const { paramCase, camelCase } = require("change-case");

exports.objParamCase = (obj) => mapKeysDeep(paramCase)(obj);
exports.objCamelCase = (obj) => mapKeysDeep(camelCase)(obj);
