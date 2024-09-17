// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const { retry } = require("./retry");
const { default: axios } = require("axios");
const { withErrorCode } = require("./withErrorCode");

async function waitForUrlConnect(
  testUrl = "https://ipinfo.io/ip",
  proxyUrl = ""
) {
  const r = await retry(() =>
    axios
      .get(testUrl, {
        proxy: proxyUrl ? new URL(proxyUrl) : undefined,
      })
      .catch(
        withErrorCode(
          "waitForUrlSuccessE1: fail: " + testUrl + " (" + proxyUrl + ")"
        )
      )
  );
  console.log(
    "waitForUrlSuccess1: success: " + testUrl + " (" + proxyUrl + ")"
  );
  return r.data;
}
exports.waitForUrlConnect = waitForUrlConnect;
