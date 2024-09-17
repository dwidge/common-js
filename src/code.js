// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const getCode = ({ stack } = new Error()) =>
  stack
    .match(/controllers[/\\]([^.]+).js:([^:]+):/)
    ?.slice(1, 3)
    .flatMap((s) => s.split(/[/\\]/))
    ?.join("-");
