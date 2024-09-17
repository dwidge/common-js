// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const preloadImages = (imagePaths: string[]) => {
  document.addEventListener("DOMContentLoaded", () => {
    imagePaths.forEach((imagePath) => {
      const img = new Image();
      img.src = imagePath;
    });
  });
};
