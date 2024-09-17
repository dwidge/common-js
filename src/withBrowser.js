// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

// const { chromium } = require("playwright");
const { waitForUrlConnect } = require("./waitForUrlConnect");

const { PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, PLAYWRIGHT_PROXY_SERVER } =
  process.env;
console.log({
  PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  PLAYWRIGHT_PROXY_SERVER,
});

async function withBrowser({ headless = false }, f = async (browser) => {}) {
  // await waitForUrlConnect("https://ipinfo.io/ip", PLAYWRIGHT_PROXY_SERVER);
  // const launchOptions = {
  //   headless,
  //   executablePath: PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  //   // args: headless ? ["--disable-gl-drawing-for-tests"] : [],
  //   args: ["--window-size=600,400"],
  //   proxy: PLAYWRIGHT_PROXY_SERVER
  //     ? {
  //         server: PLAYWRIGHT_PROXY_SERVER,
  //       }
  //     : undefined,
  // };
  // const browser = await chromium.launch(launchOptions);
  // return await f(browser).finally(() => browser.close());
}
exports.withBrowser = withBrowser;
