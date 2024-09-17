// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const fs = require("fs");
const isDocker = async () =>
  (
    await fs.promises.readFile("/proc/self/cgroup", "utf8").catch((e) => {})
  )?.includes("docker") ?? false;

exports.isDocker = isDocker;
