// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

const {
  STORAGE_PATH_FILES = "tmp/data/files",
  STORAGE_PATH_UPLOADS = "tmp/data/uploads",
  STORAGE_TYPE = "fs",
  STORAGE_FS_BASE_PATH = "tmp/files",
  STORAGE_FS_TMP_PATH = "tmp/tmp",
  STORAGE_S3_BUCKET = "",
  STORAGE_S3_REGION = "",
  STORAGE_S3_KEY_ID = "",
  STORAGE_S3_KEY_SECRET = "",
  STORAGE_S3_ENDPOINT = "",
  STORAGE_S3_LOCAL = "false",
  STORAGE_S3_TMP_PATH = "tmp",
  STORAGE_BASE_KEY = "test",
} = process.env;

export const storage = {
  type: STORAGE_TYPE,
  baseKey: STORAGE_BASE_KEY,
  path: {
    files: STORAGE_PATH_FILES,
    uploads: STORAGE_PATH_UPLOADS,
  },
  fs: {
    basePath: STORAGE_FS_BASE_PATH,
    tmpPath: STORAGE_FS_TMP_PATH,
  },
  s3: {
    bucket: STORAGE_S3_BUCKET,
    region: STORAGE_S3_REGION,
    accessKeyId: STORAGE_S3_KEY_ID,
    secretAccessKey: STORAGE_S3_KEY_SECRET,
    endpoint: STORAGE_S3_ENDPOINT,
    local: STORAGE_S3_LOCAL === "true",
    tmpPath: STORAGE_S3_TMP_PATH,
  },
};
