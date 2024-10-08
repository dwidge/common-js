// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { User } from "example-api/api/user";

export type UserToken = User & { token?: string };
