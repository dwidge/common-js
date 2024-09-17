// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const { blockPage } = require("./blockPage");

const withPage = async (
  {
    browser,
    errorScreenshotPath = `data/screenshots/error.png`,
    blockResources = ["image", "font"],
    blockUrls = ["facebook", "analytics", "sentry"],
  },
  f = async (page) => {}
) => {
  const page = await browser.newPage();
  await blockPage(page, blockResources, blockUrls);
  return await f(page)
    .catch(async (e) => {
      console.log("withPage1", errorScreenshotPath);
      await page.screenshot({ path: errorScreenshotPath });
      throw e;
    })
    .finally(() => {
      console.log("withPage2");
    });
};
exports.withPage = withPage;
