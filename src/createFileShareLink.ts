// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { config } from "../../lib/config/config.js";
import crypto from "crypto";

export const createFileShareLink = (id: string, name: string) =>
  config.api.host +
  `/share/file/${id}/${name}?hash=${createShareHash(id + name)}`;

export const createShareHash = (id: string) =>
  sha1Hash(id + config.secret.share);

const sha1Hash = (data: string) =>
  crypto.createHash("sha1").update(data).digest("hex");
