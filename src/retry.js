// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.delay = delay;

async function retry(run, retries = 5, minTimeout = 2000) {
  while (true) {
    try {
      return await run();
    } catch (error) {
      if (retries <= 0) {
        console.log("Maximum number of retries exceeded.");
        throw error;
      }

      console.log(error);
      console.log(`Retrying (${retries--}) in ${minTimeout / 1000} seconds...`);
      await delay(minTimeout);
      minTimeout *= 2;
    }
  }
}
exports.retry = retry;
