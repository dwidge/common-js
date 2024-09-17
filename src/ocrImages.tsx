// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ImageLike, createWorker } from "tesseract.js";

export const ocrImages = async (images: ImageLike[]) => {
  const worker = await createWorker("eng");
  try {
    const ret = await Promise.all(
      images.map((image) => worker.recognize(image))
    );
    return ret.map((d) => d.data.text);
  } finally {
    await worker.terminate();
  }
};
