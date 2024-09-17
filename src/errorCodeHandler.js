// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const { generateRandomNumericPin } = require("./generateRandomNumericPin");

function errorCodeHandler() {
  return (err, req, res, next) => {
    const id = "e" + generateRandomNumericPin(7);
    console.log(id, new Date().toISOString(), err);
    res.status(500).send({ error: id });
  };
}
exports.errorCodeHandler = errorCodeHandler;
