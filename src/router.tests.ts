// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { expect } from "expect";
import axios from "axios";
import * as config from "example-api/config/index";
import { withUser } from "../withUser.js";

const apiConfig = {
  baseURL: config.api.host,
  validateStatus: () => true,
};

const route = "v2/file2";

export async function testFile2Api() {
  await withUser(apiConfig, config.tester, async (authUser, headers) => {
    const userConfig = {
      ...apiConfig,
      headers,
    };
    const userAxios = axios.create(userConfig);

    const data1 = "test_data";

    const r1 = await userAxios.put(route, [{ size: data1.length }]);
    expect(r1).toMatchObject({
      data: [{ id: expect.any(String) }],
      status: 200,
    });
    const { id } = r1.data[0];
    const r2 = await userAxios.get(route + "?putUrl&getUrl&id=" + id);
    expect(r2).toMatchObject({
      data: [
        {
          id: expect.any(String),
          putUrl: null,
          getUrl: null,
        },
      ],
      status: 206,
    });
  });
}
