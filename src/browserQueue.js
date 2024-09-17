// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const { config } = require("../config");
const { withBrowser } = require("./withBrowser");
const { withPage } = require("./withPage");
const { delay } = require("./delay");

const browserQueue = (
  init,
  next,
  { headless = true, interval = 5000 } = {}
) => {
  let queue = [];
  const handle = withBrowser({ headless }, (browser) =>
    withPage({ browser }, async (page) => {
      console.log("browserQueue1 init", queue.length);
      await init(page);
      while (queue) {
        console.log("browserQueue2 poll", queue.length);
        const data = queue.pop();
        if (data) {
          console.log("browserQueue3 pop", data, queue.length);
          await next(page, data);
        }
        await delay(interval);
      }
      console.log("browserQueue4 exit");
    })
  ).finally(() => close());

  const push = (data) => {
    if (!queue) throw new Error("browserQueueE1: Browser closed");
    queue.push(data);
    console.log("browserQueue5 push", data, queue.length);
  };
  const close = () => {
    queue = undefined;
    console.log("browserQueue6 close");
  };

  return { handle, push, close };
};
exports.browserQueue = browserQueue;
