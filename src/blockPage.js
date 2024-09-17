// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const blockPage = (page, blockResources = [], blockUrls = []) =>
  page.route("**/*", (route) => {
    const canAcceptRoute = (resourceType, url) => {
      if (blockResources.includes(resourceType)) return;
      if (blockUrls.some((part) => url.includes(part))) return;
      return true;
    };
    const url = route.request().url();
    const resourceType = route.request().resourceType();
    const accept = canAcceptRoute(resourceType, url);

    // console.log(accept, resourceType, url);
    return accept ? route.continue().catch(() => {}) : route.abort();
  });
exports.blockPage = blockPage;
